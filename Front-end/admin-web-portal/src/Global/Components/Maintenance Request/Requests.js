import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import base_url from "../../../api-client/BaseUrl";
import { useQuery } from "@tanstack/react-query";

// Components
import BasicTable from "../Tables/BasicTablePagination";

// API
import FetchData from "../../../api-client/FetchData";

const Requests = () => {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState("");

	const [err, setErr] = useState("");

	const [url, setUrl] = useState(`${base_url}maintenance/get`);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (filter === "pending") {
			setUrl(`${base_url}maintenance/get`);
		} else if (filter === "completed") {
			setUrl(`${base_url}maintenance/getcompleted`);
		}
		setLoading(true);
	}, [filter]);

	const {
		status,
		error,
		data: requestsData,
	} = useQuery(["requests_data", url], FetchData);
	useEffect(() => {
		if (requestsData) {
			if (requestsData.length === 0) {
				setErr("No pending requests");
			}
			setData(requestsData);
			setLoading(false);
		}
	}, [requestsData, status, url]);

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
			},
			{
				Header: "Reservation Number",
				accessor: "reservation_id",
			},
			{
				Header: "Customer Email",
				accessor: "customer_object.email",
			},

			{
				Header: "Room",
				accessor: "room_object.title",
			},
			{
				Header: "Status",
				accessor: "status",
			},
		],
		[],
	);
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
				<h2>Maintenance Requests</h2>
				<div className='filter'>
					<select
						value={filter}
						className='filterDropDown'
						onChange={(e) => {
							setFilter(e.target.value);
						}}>
						<option value='pending'>Pending</option>
						<option value='completed'>Completed</option>
					</select>
				</div>
			</div>
			<BasicTable
				reqData={data}
				columns={columns}
				redirect={"request"}
				err={err}
			/>
		</div>
	);
};

export default Requests;
