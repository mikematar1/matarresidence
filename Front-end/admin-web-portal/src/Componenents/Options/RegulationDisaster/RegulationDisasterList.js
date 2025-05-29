import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Icons
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

// Components
import OptionsCard from "../../../Global/Components/OptionsCard";
import ReactModal from "react-modal";

// API
import GetOptions from "../../../api-client/Options/GetOptions";

const RegulationDisasterList = () => {
	const [data, setData] = useState([]);

	const [regulations, setRegulations] = useState([]);
	const [disaster, setDisaster] = useState([]);

	const [filter, setFilter] = useState("");

	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const {
		status,
		error,
		data: regulationDisaster,
	} = useQuery(["regulation_disaster", "dr"], GetOptions);
	useEffect(() => {
		if (regulationDisaster) {
			setDisaster(regulationDisaster[0]);
			setRegulations(regulationDisaster[1]);
			setLoading(false);
		}
	}, [regulationDisaster, status]);

	useEffect(() => {
		if (error) {
			alert("Error fetching data");
		}
	}, [error]);

	useEffect(() => {
		setData(mergeAndTagData());
	}, [regulations, disaster]);

	const mergeAndTagData = () => {
		let mergedAndTaggedData = [];
		regulations.forEach((regulation) => {
			mergedAndTaggedData.push({ ...regulation, tag: "regulation" });
		});
		disaster.forEach((disaster) => {
			mergedAndTaggedData.push({ ...disaster, tag: "disaster" });
		});
		return mergedAndTaggedData;
	};

	const capitalize = (str) => {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	};

	const filterByTag = (data) => {
		if (filter) {
			return data.filter((item) => item.tag === filter.toLowerCase());
		}
		return data;
	};

	const tags = ["Regulation", "Disaster"];

	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleRedirect = (item) => {
		closeModal();
		navigate("/options/regulation_disaster/info", item);
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
			<div
				className='searchAndFilter'
				style={{ justifyContent: "space-between" }}>
				<h2>Regulations & Disaster response plan</h2>
				<div className='filter'>
					<select
						className='filterDropDown'
						onChange={(e) => setFilter(e.target.value)}>
						<option value=''>All</option>
						{tags.map((tag) => (
							<option key={tag} value={tag}>
								{capitalize(tag)}
							</option>
						))}
					</select>
					<div onClick={() => openModal()}>
						<AiOutlinePlus className='add-button' />
					</div>
				</div>
			</div>
			<div className='options-list'>
				<div className='list-box'>
					{filterByTag(data).map((item, i) => (
						<OptionsCard reqData={item} key={i} />
					))}
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
					<div className='modal-header'>
						<h1>Choose option</h1>
						<AiOutlineClose className='close-button' onClick={closeModal} />
					</div>

					<p>Which option do you want to add?</p>
					<button
						onClick={() =>
							handleRedirect({
								state: { tag: "disaster", type: "add" },
							})
						}>
						Disaster
					</button>
					<button
						style={{ backgroundColor: "#aca0a0", color: "#fff" }}
						onClick={() =>
							handleRedirect({ state: { tag: "regulation", type: "add" } })
						}>
						Regulation
					</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default RegulationDisasterList;
