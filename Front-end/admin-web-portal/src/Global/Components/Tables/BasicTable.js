import { useTable } from "react-table";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";

// API
import RemoveBudget from "../../../api-client/Finance/RemoveBudget";

const Table = ({ reqData, columns, type, err }) => {
	const [option_type] = useState(type);
	const [option_id, setId] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (reqData) {
			setData(reqData);
		}
	}, [reqData]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleDeleteOptions = (id) => {
		setId(id);
		openModal();
	};

	const handleConfirmDelete = () => {
		RemoveBudget(option_id).then((res) => {
			if (res.message === "budget removed successfuly") {
				closeModal();
			}
		});
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			<table {...getTableProps()} className='basic-table'>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							className='basic-row no-hover'>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()} className='basic-heading'>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				{err && (
					<tbody>
						<tr>
							<td className='error'>{err}</td>
						</tr>
					</tbody>
				)}
				{!err && (
					<tbody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr
									{...row.getRowProps()}
									className='basic-row no-hover'
									key={row.original.id}>
									{row.cells.map((cell) => {
										let action_col = cell.column.Header === "action";
										let amount_col =
											cell.column.Header === "amount" ||
											cell.column.Header === "Transaction Amount";

										if (action_col) {
											return (
												<td {...cell.getCellProps()} className='basic-body'>
													<button
														onClick={() => {
															handleDeleteOptions(row.original.id);
														}}
														className='table-button'
														key={row.original.id}>
														Delete
													</button>
												</td>
											);
										}

										if (amount_col) {
											return (
												<td {...cell.getCellProps()} className='basic-body'>
													USD {cell.render("Cell")}
												</td>
											);
										}
										return (
											<td {...cell.getCellProps()} className='basic-body'>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				)}
			</table>
			<ReactModal
				className='custom-modal'
				isOpen={isModalOpen}
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
						zIndex: "100",
					},
				}}>
				<div>
					<h1>Confirm Delete</h1>
					<p>
						Are you sure you want to remove this {option_type}? This action
						cannot be undone.
					</p>
					<button onClick={handleConfirmDelete}>Yes</button>
					<button onClick={closeModal}>No</button>
				</div>
			</ReactModal>
		</div>
	);
};

export default Table;
