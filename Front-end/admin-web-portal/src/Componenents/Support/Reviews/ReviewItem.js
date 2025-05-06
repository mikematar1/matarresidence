import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import Rating from "../../../Global/Components/Rating";
import ReactModal from "react-modal";

// API
import FeatureReview from "../../../api-client/Support/FeatureReview";

const ReviewItem = () => {
	const loc = useLocation();
	const [data, setData] = useState(loc.state.data);

	const [username, setUsername] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState("");
	const [date, setDate] = useState("");
	const [show, setShow] = useState("");

	useEffect(() => {
		setUsername(data.email);
		setReview(data.comment);
		setRating(data.rating);
		setDate(data.created_at);

		if (data.featured) {
			setShow("Hide");
		} else {
			setShow("Show");
		}
	}, [data]);

	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleAdd = () => {
		openModal();
	};

	const navigate = useNavigate();
	const handleConfirmAdd = () => {
		const feature = FeatureReview(data.id);
		feature.then((res) => {
			if (res.status === 200) {
				if (res.data.featured) {
					setShow("Hide");
				} else {
					setShow("Show");
				}
				const new_data = res.data;
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
					<h2>Review #{data.id}</h2>
					<button className='button' onClick={handleAdd}>
						{show}
					</button>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Customer email</label>
						</div>
						<div>
							<p>{username}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Review</label>
						</div>
						<div>
							<p>{review}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Rating</label>
						</div>
						<div>
							<Rating rate={rating} />
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Date</label>
						</div>
						<div>
							<p>{date}</p>
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
					<h1>Confirm Add</h1>
					<p>Are you sure you want to add this to the website home page?</p>
					<button onClick={handleConfirmAdd}>Yes</button>
					<button onClick={closeModal}>No</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default ReviewItem;
