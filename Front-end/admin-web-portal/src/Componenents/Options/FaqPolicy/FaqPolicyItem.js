import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

// Components
import ReactModal from "react-modal";

// Functions
import checkEmpty from "../../../Global/Functions/CheckEmpty";
import checkEqual from "../../../Global/Functions/CheckEqual";

// API
import AddOption from "../../../api-client/Options/AddOption";
import EditOption from "../../../api-client/Options/EditOption";
import DeleteOption from "../../../api-client/Options/DeleteOptions";

const FaqPolicyItem = () => {
	const loc = useLocation();
	const [isValid, setIsValid] = useState(loc.state);

	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [tag, setTag] = useState("");

	const [edit, setEdit] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (isValid) {
			if (isValid.type) {
				setTag(isValid.tag);
				setEdit(true);
			} else {
				setIsValid(loc.state.data);
			}
		}
	}, [loc.state]);

	useEffect(() => {
		if (!isValid.type) {
			if (isValid.tag === "faq") {
				setQuestion(isValid.question);
				setAnswer(isValid.answer);
			} else {
				setQuestion(isValid.title);
				setAnswer(isValid.text);
			}

			setTag(isValid.tag);
		}
	}, [isValid]);

	const capitalize = (str) => {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		if (isValid.type) {
			navigate(-1);
		} else {
			setEdit(false);
			setQuestion(isValid.question);
			setAnswer(isValid.answer);
			setTag(isValid.tag);
		}
	};

	const handleEdit = (e) => {
		const data = {};
		e.preventDefault();
		if (tag === "faq") {
			data.question = question;
			data.answer = answer;
		}
		if (tag === "policy") {
			data.title = question;
			data.text = answer;
		}

		const check_empty = checkEmpty(data);
		if (!check_empty) {
			alert("Please fill all the fields");
			return;
		}
		const reqData = checkEqual(data, isValid);
		if (!reqData) {
			alert("No changes made");
			return;
		}

		if (tag === "faq") {
			reqData.faq_id = isValid.id;
		} else {
			reqData.policy_id = isValid.id;
		}
		const response = EditOption(reqData, tag);
		response.then((res) => {
			if (
				res.message === "policy editted successfuly" ||
				res.message === "faq editted successfuly"
			) {
				res.data.tag = tag;
				const new_data = { data: res.data };
				loc.state = new_data;
				setIsValid(new_data);
				setEdit(false);
			} else {
				alert("Something went wrong");
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {};
		if (tag === "faq") {
			data.question = question;
			data.answer = answer;
		}
		if (tag === "Policy") {
			data.title = question;
			data.text = answer;
		}

		const check_empty = checkEmpty(data);
		if (!check_empty) {
			alert("Please fill all the fields");
			return;
		}

		const response = AddOption(data, tag);
		response.then((res) => {
			if (res.message === "successful") {
				const new_data = res.data;
				new_data.tag = tag;
				loc.state = { data: new_data };
				setIsValid(loc.state);
				setEdit(false);
			} else {
				alert("Something went wrong");
			}
		});
	};

	// Modal
	const handleDelete = (e) => {
		e.preventDefault();
		openModal();
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		const response = DeleteOption(isValid.id, tag);
		response.then((res) => {
			if (
				res.message === "faq removed successfuly" ||
				res.message === "policy removed successfuly"
			) {
				navigate(-1);
			} else {
				alert("Something went wrong");
			}
		});
		closeModal();
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='container'>
			<form
				className='edit-container'
				onSubmit={(e) => {
					if (isValid) {
						if (isValid.type) {
							handleSubmit(e);
						} else {
							handleEdit(e);
						}
					}
				}}>
				<div className='edit-item'>
					{!isValid.type && (
						<h2>
							{capitalize(tag)} #{isValid.id}
						</h2>
					)}
					{isValid.type && <h2>{capitalize(tag)}</h2>}

					{!isValid.type && (
						<button className='button' onClick={(e) => handleDelete(e)}>
							Delete
						</button>
					)}
					{edit && (
						<>
							<button className='save-button' type='submit'>
								Save
							</button>
							<button className='button' onClick={(e) => handleCancel(e)}>
								cancel
							</button>
						</>
					)}
					{!edit && (
						<button className='button' onClick={() => setEdit(true)}>
							Edit
						</button>
					)}
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>{tag === "faq" ? "Question" : "Title"}</label>
						</div>
						<div>
							{!edit && <p>{question}</p>}
							{edit && (
								<textarea
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
									className='input-box bio-input'
								/>
							)}
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info info-large'>
						<div style={{ alignSelf: "flex-start" }}>
							<label>{tag === "faq" ? "Answer" : "Description"}</label>
						</div>
						<div>
							{!edit && <p>{answer}</p>}
							{edit && (
								<textarea
									value={answer}
									onChange={(e) => setAnswer(e.target.value)}
									className='input-box bio-input'
								/>
							)}
						</div>
					</div>
				</div>
			</form>
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
					<p>
						Are you sure you want to delete this {capitalize(tag)}? This action
						cannot be undone.
					</p>
					<button onClick={handleConfirmDelete}>Yes</button>
					<button onClick={closeModal}>No</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default FaqPolicyItem;
