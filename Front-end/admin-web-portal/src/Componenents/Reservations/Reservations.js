import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import base_url from "../../api-client/BaseUrl";

// Components
import BasicTable from "../../Global/Components/Tables/BasicTablePagination";
import SearchList from "../../Global/Components/SearchList";

// Icons
import search_icon from "../../assets/icons/search.svg";

// API
import FetchData from "../../api-client/FetchData";
import Search from "../../api-client/Search";

const Reservations = () => {
	const [data, setData] = useState([]);
	const [err, setErr] = useState("");

	const [query, setQuery] = useState("");
	const [searchErr, setSearchErr] = useState("");
	const [reservations, setReservations] = useState([]);
	const [searchLoading, setSeachLoading] = useState(false);

	const [loading, setLoading] = useState(true);

	const columns = [
		{
			Header: "Reservation Number",
			accessor: "id",
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
			Header: "Check-in",
			accessor: "reservation_date",
		},
		{
			Header: "Check-out",
			accessor: "reservation_end",
		},
		{
			Header: "Payment amount",
			accessor: "amount",
		},
		{
			Header: "Payment Status",
			accessor: "status",
		},
	];
	const {
		status,
		error,
		data: reservationData,
	} = useQuery(
		["reservation_data", `${base_url}room/reservation/get`],
		FetchData,
	);
	useEffect(() => {
		if (reservationData) {
			setData(reservationData.reservations);
			if (reservationData.reservations.data.length === 0) {
				setErr("No reservations found");
			}
			setLoading(false);
		}
	}, [reservationData, status]);

	useEffect(() => {
		handleSearch();
	}, [query]);

	// Search handler
	const navigate = useNavigate();
	const handleRedirect = (employee) => {
		setQuery("");
		navigate("/reservations/info", { state: { data: employee } });
	};

	const handleSearch = () => {
		setSearchErr("");
		const reqQuery = {
			search_query: query,
		};
		setSeachLoading(true);
		Search(reqQuery, "reservation").then((res) => {
			if (res.reservations) {
				setReservations(res.reservations);
			} else {
				setSearchErr("No reservations found");
			}
			setSeachLoading(false);
		});
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
			<div className='searchAndFilter'>
				<div className='search-bar full'>
					<img src={search_icon} alt='' className='search-icon' />
					<input
						className='search-input'
						type='text'
						placeholder='Search'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
			</div>
			<div className='employees-container'>
				{!query && (
					<BasicTable
						reqData={data}
						columns={columns}
						redirect={"reservation"}
						err={err}
					/>
				)}
				{query && (
					<SearchList
						data={reservations}
						redirect={handleRedirect}
						loading={searchLoading}
						error={searchErr}
						type='reservation'
					/>
				)}
			</div>
		</div>
	);
};

export default Reservations;
