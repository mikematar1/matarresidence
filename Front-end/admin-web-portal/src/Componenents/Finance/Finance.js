import { useMemo, useState, useEffect } from "react";
import BasicTable from "../../Global/Components/Tables/BasicTable";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ReactModal from "react-modal";

// Icons
import { AiOutlinePlus } from "react-icons/ai";

// API
import AddBudget from "../../api-client/Finance/AddBudget";
import FetchFinance from "../../api-client/Finance/FetchFinance";

const Finance = () => {
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState("");
	// State for storing budget information
	const [budgetErr, setBudgetErr] = useState("");
	const [isBudgetModalOpen, setBudgetModalOpen] = useState(false);
	const [budgets, setBudgets] = useState([]);
	const [budget_name, setBudgetName] = useState("");
	const [amount, setAmount] = useState("");

	// State for storing transaction information
	const [transactions, setTransactions] = useState([]);
	const [transactionsErr, setTransactionsErr] = useState("");

	const {
		status,
		error,
		data: financeData,
	} = useQuery(["finance_data"], FetchFinance);
	useEffect(() => {
		if (financeData) {
			if (financeData.name === "AxiosError") {
				setLoading(false);
				setErr("Something went wrong");
			}
			if (financeData.length === 0) {
				setBudgetErr("No budgets found");
			}
			setBudgets(financeData);
			setLoading(false);
		}
	}, [financeData, status, isBudgetModalOpen]);

	useEffect(() => {
		if (transactions.length === 0) {
			setTransactionsErr("No transactions found");
		}
	}, [transactions]);

	const handleAddBudget = (e) => {
		e.preventDefault();
		const reqData = {
			name: budget_name,
			amount: amount,
		};

		AddBudget(reqData).then((res) => {
			if (res.status === "success") {
				setBudgets([...budgets, res.budget]);
			} else {
				setBudgetErr(res.data);
			}
			closeBudgetModal();
		});
	};
	const openBudgetModal = () => {
		setBudgetModalOpen(true);
	};
	const closeBudgetModal = () => {
		setBudgetModalOpen(false);
		setBudgetErr("");
		setBudgetName("");
		setAmount("");
	};

	const budget_columns = useMemo(
		() => [
			{
				Header: "id",
				accessor: "id",
			},
			{
				Header: "name",
				accessor: "name",
			},
			{
				Header: "amount",
				accessor: "amount",
			},
			{
				Header: "action",
			},
		],
		[],
	);
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
	if (err !== "") {
		return <div className='container-buffer'>{err}</div>;
	}

	if (loading) {
		return (
			<div className='container-buffer'>
				<div className='buffer-loader home'></div>
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='budget-container'>
				<div className='request-box' style={{ maxHeight: "24em" }}>
					<div className='request-header'>
						<div className='title'>Budgets</div>
						<AiOutlinePlus className='add-button' onClick={openBudgetModal} />
					</div>

					<BasicTable
						reqData={budgets}
						columns={budget_columns}
						type={"budget"}
						err={budgetErr}
					/>
				</div>
				<div className='request-box' style={{ maxHeight: "24em" }}>
					<div className='request-header'>
						<div className='title'>Revenue</div>
						<Link to='/finance/transactions' className='item-redirect'>
							View All
						</Link>
					</div>

					<BasicTable
						reqData={transactions}
						columns={columns}
						type={"transaction"}
						err={transactionsErr}
					/>
				</div>
			</div>
			<ReactModal
				className='custom-modal'
				isOpen={isBudgetModalOpen}
				style={{
					overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
					content: {
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						border: "none",
						width: "100%",
						height: "100%",
						margin: "auto",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: "200",
					},
				}}>
				<div style={{ height: "17em" }}>
					<form>
						<h1>Add budget</h1>
						<div
							className='edit-container'
							style={{ padding: "0", paddingBottom: "2em", width: "100%" }}>
							<div
								className='edit-item'
								style={{
									width: "75%",
									padding: "0",
									paddingLeft: "1em",
									paddingBottom: "1em",
									border: "0",
								}}>
								<div>
									<label style={{ marginRight: "1em" }}>Name</label>
								</div>
								<div>
									<input
										type='text'
										value={budget_name}
										onChange={(e) => setBudgetName(e.target.value)}
										className='input-box'
									/>
								</div>
							</div>
							<div
								className='edit-item'
								style={{
									width: "75%",
									padding: "0",
									paddingLeft: "1em",
									paddingBottom: "1em",
									border: "0",
								}}>
								<div>
									<label>Amount (USD)</label>
								</div>
								<div>
									<input
										type='number'
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										className='input-box'
									/>
								</div>
							</div>
						</div>
						<button onClick={(e) => handleAddBudget(e)}>Add</button>
						<button onClick={closeBudgetModal}>Cancel</button>
					</form>
				</div>
			</ReactModal>
		</div>
	);
};

export default Finance;
