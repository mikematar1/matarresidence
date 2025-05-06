import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReactModal from "react-modal";

// API
import CancelReservation from "../../api-client/Reservations/CancelReservation";

const ReservationItem = () => {
	const loc = useLocation();
	const [data, setData] = useState(loc.state.data);

	const [checkin, setCheckin] = useState("");
	const [checkout, setCheckout] = useState("");
	const [room_name, setRoom_name] = useState("");
	const [amount, setAmount] = useState("");
	const [status, setStatus] = useState("");
	const [requests, setRequests] = useState("");
	const [customer_name, setCustomerName] = useState("");

	const [room, setRoom] = useState({});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (data) {
			handleClose();
		}
	}, [data]);

	const handleClose = () => {
		setCheckin(data.reservation_date);
		setCheckout(data.reservation_end);
		setRoom_name(data.room_object.title);
		setAmount(data.amount);
		setStatus(data.status);
		setRequests(data.requests);
		setCustomerName(data.customer_object.email);

		setRoom({
			room: data.room_object,
			images: data.images,
		});
	};

	const navigate = useNavigate();
	const handleRedirect = (url, state) => {
		navigate(url, state);
	};

	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		openModal();
	};

	const handleConfirmDelete = () => {
		const id = data.id;
		setLoading(true);
		const response = CancelReservation(id);
		response.then((res) => {
			if (res === "success") {
				navigate("/reservations");
			} else {
				alert("Something went wrong");
				setLoading(false);
			}
		});
		closeModal();
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	if (loading) {
		return (
			<div className='container-buffer'>
				<div className='buffer-loader home'></div>
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='edit-container'>
				<div className='edit-item'>
					<h2>Reservation #{data.id}</h2>
					<button className='button' onClick={(e) => handleDelete(e)}>
						Cancel
					</button>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Customer email</label>
						</div>
						<div>
							<p
								style={{ cursor: "pointer" }}
								onClick={() =>
									handleRedirect("/user/profile", {
										state: { data: data.customer_object },
									})
								}>
								{customer_name}
							</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Room name</label>
						</div>
						<div>
							<p
								style={{ cursor: "pointer" }}
								onClick={() => {
									handleRedirect("/room/profile", {
										state: { data: room },
									});
								}}>
								{room_name}
							</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Check in</label>
						</div>
						<div>
							<p>{checkin}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Check out</label>
						</div>
						<div>
							<p>{checkout}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Payment amount</label>
						</div>
						<div>
							<p>USD {amount}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Status</label>
						</div>
						<div>
							<p>{status}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Request</label>
						</div>
						<div>
							<p>{requests}</p>
						</div>
					</div>
				</div>
			</div>
			<ReactModal
				className='custom-modal'
				isOpen={isModalOpen}
				style={{
					overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
					content: {
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						border: "none",
						width: "100%",
						height: "100%",
						margin: "auto",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: "100",
					},
				}}>
				<div>
					<h1>Confirm Cancellation</h1>
					<p>
						Are you sure you want to cancel this reservation? This action cannot
						be undone. Make sure to notify the customer.
					</p>
					<button onClick={handleConfirmDelete}>Yes</button>
					<button onClick={closeModal}>No</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default ReservationItem;
