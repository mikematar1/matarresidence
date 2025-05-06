import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailMarketing = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Email Marketing");
	};

	return (
		<div className='container'>
			<form className='edit-container' onSubmit={(e) => handleSubmit(e)}>
				<div className='edit-item'>
					<h2>Email Content</h2>
					<>
						<button className='save-button' type='submit'>
							Send
						</button>
						<button className='button' onClick={() => navigate(-1)}>
							cancel
						</button>
					</>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>Title</label>
						</div>
						<div>
							<textarea
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='input-box bio-input'
							/>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>Description</label>
						</div>
						<div>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className='input-box bio-input'
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EmailMarketing;
