import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import base_url from "../../../api-client/BaseUrl";

// Components
import BasicTable from "../../../Global/Components/Tables/BasicTablePagination";

// API
import FetchData from "../../../api-client/FetchData";

const Reviews = () => {
	const [data, setData] = useState([]);
	const [err, setErr] = useState("");

	const [loading, setLoading] = useState(true);

	const columns = useMemo(
		() => [
			{
				Header: "id",
				accessor: "id",
			},
			{
				Header: "Customer Email",
				accessor: "email",
			},
			{
				Header: "Review",
				accessor: "comment",
			},
			{
				Header: "Rating",
				accessor: "rating",
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
		data: reviewData,
	} = useQuery(["review_data", `${base_url}review/getall`], FetchData);
	useEffect(() => {
		if (reviewData) {
			console.log(reviewData.data.length);
			if (reviewData.data.length > 0) {
				reviewData.data.forEach((review) => {
					review.created_at = formatDate(review.created_at);
				});
				setData(reviewData);
			} else {
				setErr("No feedbacks found");
			}
			setLoading(false);
		}
	}, [reviewData, status]);

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
				<h2>Reviews</h2>
				<div className='reviews-container'>
					<BasicTable
						reqData={data}
						columns={columns}
						redirect={"review"}
						err={err}
					/>
				</div>
			</div>
		</div>
	);
};

export default Reviews;
