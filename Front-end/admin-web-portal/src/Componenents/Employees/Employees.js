import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import base_url from "../../api-client/BaseUrl";

// API
import FetchData from "../../api-client/FetchData";
import Search from "../../api-client/Search";

// Components
import BasicTable from "../../Global/Components/Tables/BasicTablePagination";
import SearchList from "../../Global/Components/SearchList";

// Icons
import { AiOutlinePlus } from "react-icons/ai";
import search_icon from "../../assets/icons/search.svg";

export default function Employees() {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState("");
	const [err, setErr] = useState("");

	const [searchErr, setSearchErr] = useState("");
	const [employees, setEmployees] = useState([]);

	const [loading, setLoading] = useState(true);
	const [searchLoading, setSeachLoading] = useState(false);

	const {
		status,
		error,
		data: staffData,
	} = useQuery(["staff_data", `${base_url}staff/get`], FetchData);
	useEffect(() => {
		if (staffData) {
			if (staffData.data.length > 0) {
				setData(staffData);
			} else {
				setErr("No staff found");
			}
			setLoading(false);
		}
	}, [staffData, status]);

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
				Header: "Position",
				accessor: "position",
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
		navigate("/employee/profile", { state: { data: employee } });
	};

	const handleSearch = () => {
		setSearchErr("");
		const reqQuery = {
			search_query: query,
		};
		setSeachLoading(true);
		Search(reqQuery).then((res) => {
			if (res.employees) {
				setEmployees(res.employees);
			} else {
				setSearchErr("No employees found");
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
				<div className='search-bar'>
					<img src={search_icon} alt='' className='search-icon' />
					<input
						className='search-input'
						type='text'
						placeholder='Search'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<Link to='/employee/profile'>
					<AiOutlinePlus className='add-button' />
				</Link>
			</div>
			<div className='employees-container'>
				{!query && (
					<BasicTable
						reqData={data}
						columns={columns}
						redirect={"employee"}
						err={err}
						type={"activate"}
					/>
				)}
				{query && (
					<SearchList
						data={employees}
						redirect={handleRedirect}
						loading={searchLoading}
						error={searchErr}
						type='employee'
					/>
				)}
			</div>
		</div>
	);
}
