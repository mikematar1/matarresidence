import { useState, useEffect, useMemo } from "react";

// Components
import BasicTable from "../../Global/Components/Tables/BasicTable";

// Icons
import search_icon from "../../assets/icons/search.svg";

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [err, setErr] = useState("");

	const [query, setQuery] = useState("");

	useEffect(() => {
		setTransactions([
			{
				id: 1234,
				customer_name: "John Smith",
				amount: 1000.5,
				date: "2023-04-22",
			},
			{
				id: 5678,
				customer_name: "Jane Doe",
				amount: 750.2,
				date: "2023-05-10",
			},
			{
				id: 9101,
				customer_name: "Bob Johnson",
				amount: 2500.0,
				date: "2023-06-15",
			},
			{
				id: 1121,
				customer_name: "Alice Lee",
				amount: 500.0,
				date: "2023-07-01",
			},
			{
				id: 3141,
				customer_name: "Charlie Brown",
				amount: 1500.75,
				date: "2023-08-20",
			},
		]);
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: "Reservation number",
				accessor: "id",
			},
			{
				Header: "Customer name",
				accessor: "customer_name",
			},
			{
				Header: "Transaction Amount",
				accessor: "amount",
			},
			{
				Header: "Date",
				accessor: "date",
			},
		],
		[],
	);

	return (
		<div className='container'>
			<div className='requests-container'>
				<h2>Transactions</h2>
				<div className='searchAndFilter'>
					<div className='search-bar full'>
						<img src={search_icon} alt='' className='search-icon' />
						<input
							className='search-input'
							type='text'
							placeholder='Search'
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
				</div>
				<BasicTable
					reqData={transactions}
					columns={columns}
					redirect={"request"}
				/>
			</div>
		</div>
	);
};

export default Transactions;
