import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BanUser from "../../api-client/Clients/BanUser";

const UserItem = () => {
	const loc = useLocation();
	const [data, setData] = useState(loc.state.data);

	const [ban, setBan] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");

	useEffect(() => {
		if (data.banned) {
			setBan("Unban");
		} else {
			setBan("Ban");
		}
		setUsername(data.username);
		setName(data.name);
		setEmail(data.email);
		setPhoneNumber(data.phone_number);
		setDob(data.dob);
		setGender(data.gender);
	}, []);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleBan = () => {
		openModal();
	};

	const navigate = useNavigate();
	const handleConfirmBan = () => {
		let user_id = data.id;
		const response = BanUser(user_id);
		response.then((res) => {
			if (res !== "error") {
				if (res.banned === 1) {
					setBan("Unban");
				} else {
					setBan("Ban");
				}
				const new_data = res.user;
				loc.state = { data: new_data };
			}
		});
		closeModal();
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='container'>
			<div className='edit-container'>
				<div className='edit-item'>
					<h2>User #{data.id}</h2>
					<button className='button' onClick={() => handleBan()}>
						{ban}
					</button>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Username</label>
						</div>
						<div>
							<p>{username}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Name</label>
						</div>
						<div>
							<p>{name}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Email</label>
						</div>
						<div>
							<p>{email}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Phone number</label>
						</div>
						<div>
							<p>{phoneNumber}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Date of birth</label>
						</div>
						<div>
							<p>{dob}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Gender</label>
						</div>
						<div>
							<p>{capitalizeFirstLetter(gender)}</p>
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
					<h1>Confirm Delete</h1>
					<p>Are you sure you want to ban this user?</p>
					<button onClick={handleConfirmBan}>Yes</button>
					<button onClick={closeModal}>No</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default UserItem;
