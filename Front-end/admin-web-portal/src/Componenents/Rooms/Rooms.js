import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Components
import Room from "./RoomCard";

// Icons
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

// API
import GetRoom from "../../api-client/Rooms/GetRoom";

function Rooms() {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState("");
	const [err, setErr] = useState("");

	const [loading, setLoading] = useState(true);

	let counter_key = 1;

	const { status, error, data: roomsData } = useQuery(["rooms_data"], GetRoom);
	useEffect(() => {
		if (roomsData) {
			if (roomsData.length === 0) {
				setErr("No rooms found");
			}
			setData(roomsData);
			setLoading(false);
		}
	}, [roomsData, status]);

	const search_parameters = Object.keys(Object.assign({}, ...data));
	const filter_items = [...new Set(data.map((item) => item.room.beds))].map(
		(beds) => {
			return { beds: beds, id: counter_key++ };
		},
	);

	function search(items) {
		return items.filter((item) => {
			const { room, ...rest } = item;
			const searchKeys = [...Object.keys(room), ...search_parameters];
			return (
				item.room.beds.includes(filter) &&
				searchKeys.some((key) =>
					String(rest[key] || room[key])
						.toLowerCase()
						.includes(query.toLowerCase()),
				)
			);
		});
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
			<div className='searchAndFilter'>
				<div className='search-bar'>
					<AiOutlineSearch className='search-icon' />
					<input
						className='search-input'
						type='text'
						placeholder='Search'
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<select
					className='filterDropDown'
					onChange={(e) => setFilter(e.target.value)}>
					<option value=''>Filter by category</option>
					{filter_items.map((item) => (
						<option value={item.beds} key={item.id}>
							{item.beds}
						</option>
					))}
				</select>
				<Link to='/room/profile'>
					<AiOutlinePlus className='add-button' />
				</Link>
			</div>
			<div className='rooms-container'>
				<div className='list-box'>
					{err && (
						<h2
							style={{
								position: "fixed",
								top: "50%",
								left: "50%",
							}}>
							{err}
						</h2>
					)}
					{!err &&
						search(data).map((item) => {
							return <Room data={item} key={item.room.id} />;
						})}
				</div>
			</div>
		</div>
	);
}

export default Rooms;
