import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import SearchList from "../SearchList";

// API
import Search from "../../../api-client/Search";
import AssignEmployee from "../../../api-client/Maintenance/AssignEmployee";

const RequestItem = () => {
	const loc = useLocation();
	const [data, setData] = useState(loc.state.data);

	const [query, setQuery] = useState("");

	const [assigned, setAssigned] = useState(false);

	const [room, setRoom] = useState({});
	const [reservation, setReservation] = useState({});
	const [customer, setCustomer] = useState({});
	const [employees, setEmployees] = useState([]);

	const [employee, setEmployee] = useState({});

	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selected, setSelected] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setRoom(data.room_object);
		setReservation(data.reservation_object);
		setCustomer(data.customer_object);
		setEmployee(data.employee_object);

		if (data.status !== "pending") {
			setAssigned(true);
		}
	}, [data]);

	useEffect(() => {
		handleSearch();
	}, [query]);

	const handleSearch = () => {
		setError("");
		const reqQuery = {
			search_query: query,
		};
		setLoading(true);
		Search(reqQuery).then((res) => {
			if (res.employees) {
				setEmployees(res.employees);
			} else {
				setError("No employees found");
			}
			setLoading(false);
		});
	};

	const handleSetEmployee = (employee) => {
		setEmployee(employee);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!assigned) {
			alert("Please assign an employee first");
		}

		const reqData = {
			employee_id: employee.id,
			requestid: data.id,
		};

		const response = AssignEmployee(reqData);
		response.then((res) => {
			if (res.message === "success") {
				res.id = res.maintenance_object.id;
				res.status = res.maintenance_object.status;
				loc.state = { data: res };
				setData(res);
				setEdit(false);
			} else {
				alert("Error assigning employee");
			}
		});
	};

	const handleCancel = () => {
		setEdit(false);

		if (!assigned) {
			navigate(-1);
		}
	};

	const handleRedirect = (path, state) => () => {
		navigate(path, state);
	};

	return (
		<div className='container'>
			<form className='edit-container' onSubmit={handleSubmit}>
				<div className='edit-item'>
					<h2>Request #{data.id}</h2>
					{(!assigned || edit) && (
						<>
							<button type='submit' className='save-button'>
								Save
							</button>
							<button type='button' className='button' onClick={handleCancel}>
								Cancel
							</button>
						</>
					)}
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Customer Email</label>
						</div>
						<div>
							<p
								style={{ cursor: "pointer" }}
								onClick={handleRedirect("/user/profile", {
									state: { data: customer },
								})}>
								{customer.email}
							</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Reservation</label>
						</div>
						<div>
							<p>#{reservation.id}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Room</label>
						</div>
						<div>
							<p>{room.title}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Status</label>
						</div>
						<div>
							<p>{data.status}</p>
						</div>
					</div>
				</div>
				<div className='edit-item'>
					<div className='edit-info'>
						<div>
							<label>Employee</label>
						</div>
						{assigned && !edit && (
							<div>
								<p>{employee.username}</p>
							</div>
						)}
						{(!assigned || edit) && (
							<div>
								<input
									className='search-input'
									type='text'
									placeholder='Search'
									onChange={(e) => setQuery(e.target.value)}
									onFocus={() => {
										setQuery("");
										setEmployee("");
									}}
									value={employee ? employee.username : query}
								/>
								{!employee && query && (
									<SearchList
										data={employees}
										redirect={handleSetEmployee}
										loading={loading}
										error={error}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default RequestItem;
