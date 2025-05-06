import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const OptionsCard = (reqData) => {
	const [data, setData] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (reqData.reqData.tag === "faq") {
			reqData.reqData.title = reqData.reqData.question;
			reqData.reqData.text = reqData.reqData.answer;
		}
		setData(reqData.reqData);
	}, [reqData]);

	const capitalize = (str) => {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	};

	const redirect = () => {
		if (data.tag === "policy" || data.tag === "faq") {
			navigate("/options/faqs_policies/info", { state: { data: data } });
		} else if (data.tag === "regulation" || data.tag === "disaster") {
			navigate("/options/regulation_disaster/info", { state: { data: data } });
		}
	};

	return (
		<div className='options-card' onClick={redirect}>
			<div className='options-card-header'>
				<h2>{data.title}</h2>
				<span>{capitalize(data.tag)}</span>
			</div>
			<p>{data.text}</p>
		</div>
	);
};

export default OptionsCard;
