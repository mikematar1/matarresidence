import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FeedbackItem = () => {
	const loc = useLocation();
	const [data, setData] = useState(loc.state.data);

	const [username, setUsername] = useState("");
	const [feedback, setFeedback] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		setUsername(data.customer_id);
		setFeedback(data.text);
		setDate(data.created_at);
	}, []);

	return (
		<div className='container'>
			<div className='edit-container'>
				<div className='edit-item'>
					<h2>Feedback #{data.id}</h2>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Customer ID</label>
						</div>
						<div>
							<p>{username}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div>
							<label>Feedback</label>
						</div>
						<div>
							<p>{feedback}</p>
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
		</div>
	);
};

export default FeedbackItem;
