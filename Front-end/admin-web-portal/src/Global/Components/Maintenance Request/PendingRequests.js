import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import BasicTable from "../Tables/BasicTable";

export default function PendingRequests({ reqData }) {
	const [data, setData] = useState([]);
	const [err, setErr] = useState("");

	useEffect(() => {
		if (reqData.data.length > 0) setData(reqData.data);
		else setErr("No pending requests");
	}, [reqData]);

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

	const navigate = useNavigate();
	const maintenanceRedirect = () => {
		navigate("/maintenance/requests", { state: { data: reqData } });
	};

	return (
		<div className='request-box'>
			<div className='request-header'>
				<div className='title'>Pending room maintenance requests</div>
				<div className='item-redirect' onClick={maintenanceRedirect}>
					View All
				</div>
			</div>

			<BasicTable reqData={data} columns={columns} err={err} />
		</div>
	);
}
