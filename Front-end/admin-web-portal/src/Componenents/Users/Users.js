import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import base_url from "../../api-client/BaseUrl";

// Components
import BasicTable from "../../Global/Components/Tables/BasicTablePagination";
import SearchList from "../../Global/Components/SearchList";

// Icons
import search_icon from "../../assets/icons/search.svg";

// API
import FetchData from "../../api-client/FetchData";
import Search from "../../api-client/Search";

export default function Users() {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState("");

	const [searchErr, setSearchErr] = useState("");
	const [users, setUsers] = useState([]);
	const [searchLoading, setSeachLoading] = useState(false);

	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(true);

	const {
		status,
		error,
		data: usersData,
	} = useQuery(["users_data", `${base_url}customer/get`], FetchData);
	useEffect(() => {
		if (usersData) {
			if (usersData.data.length > 0) {
				setData(usersData);
			} else {
				setErr("No users found");
			}
			setLoading(false);
		}
	}, [usersData, status]);

	useEffect(() => {
		handleSearch();
	}, [query]);

	const columns = useMemo(
		() => [
			{
				Header: "id",
				accessor: "id",
			},
			{
				Header: "Username",
				accessor: "username",
			},
			{
				Header: "Full name",
				accessor: "name",
			},
			{
				Header: "Email",
				accessor: "email",
			},
			{
				Header: "Phone Number",
				accessor: "phone_number",
			},
			{
				Header: "Date of Birth",
				accessor: "dob",
			},
			{
				Header: "Gender",
				accessor: "gender",
			},
		],
		[],
	);

	// Search handler
	const navigate = useNavigate();
	const handleRedirect = (employee) => {
		setQuery("");
		navigate("/user/profile", { state: { data: employee } });
	};

	const handleSearch = () => {
		setSearchErr("");
		const reqQuery = {
			search_query: query,
		};
		setSeachLoading(true);
		Search(reqQuery, "customer").then((res) => {
			if (res.customers) {
				setUsers(res.customers);
			} else {
				setSearchErr("No customers found");
			}
			setSeachLoading(false);
		});
	};

	return (
		<>
			{loading ? (
				<div className='container-buffer'>
					<div className='buffer-loader home'></div>
				</div>
			) : (
				<div className='container'>
					<div className='searchAndFilter'>
						<div className='search-bar full'>
							<img src={search_icon} alt='' className='search-icon' />
							<input
								className='search-input'
								type='text'
								placeholder='Search'
								onChange={(e) => setQuery(e.target.value)}
								value={query}
							/>
						</div>
					</div>
					<div className='employees-container'>
						{!query && (
							<BasicTable
								reqData={data}
								columns={columns}
								redirect={"user"}
								err={err}
							/>
						)}
						{query && (
							<SearchList
								data={users}
								redirect={handleRedirect}
								loading={searchLoading}
								error={searchErr}
								type='employee'
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
