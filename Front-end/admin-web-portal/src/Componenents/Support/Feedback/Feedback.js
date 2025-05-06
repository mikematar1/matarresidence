import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import base_url from "../../../api-client/BaseUrl";

// Components
import BasicTable from "../../../Global/Components/Tables/BasicTablePagination";

// API
import FetchData from "../../../api-client/FetchData";

const Feedback = () => {
	const [data, setData] = useState([]);
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);
	const [tableErr, setTableErr] = useState("");

	const columns = useMemo(
		() => [
			{
				Header: "id",
				accessor: "id",
			},
			{
				Header: "Customer ID",
				accessor: "customer_id",
			},
			{
				Header: "Feedback",
				accessor: "text",
			},
			{
				Header: "Date",
				accessor: "created_at",
			},
		],
		[],
	);

	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		const hours = ("0" + date.getHours()).slice(-2);
		const minutes = ("0" + date.getMinutes()).slice(-2);
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	const {
		status,
		error,
		data: feedbackData,
	} = useQuery(["feedback_data", `${base_url}feedback/get`], FetchData, {
		staleTime: 300000, // 5 minutes
	});
	useEffect(() => {
		if (feedbackData) {
			if (feedbackData[0].data.length > 0) {
				feedbackData[0].data.forEach((feedback) => {
					feedback.created_at = formatDate(feedback.created_at);
				});
				setData(feedbackData[0]);
			} else {
				setTableErr("No feedbacks found");
			}
			setLoading(false);
		}
	}, [feedbackData, status]);

	if (loading) {
		return (
			<div className='container-buffer'>
				<div className='buffer-loader home'></div>
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='requests-container'>
				<h2>Feedbacks</h2>
				<div className='reviews-container'>
					<BasicTable
						reqData={data}
						columns={columns}
						redirect={"feedback"}
						err={tableErr}
					/>
				</div>
			</div>
		</div>
	);
};

export default Feedback;
