import { useNavigate } from "react-router-dom";

// Images

function RoomCard({ data }) {
	const navigate = useNavigate();
	const showPopup = (item) => {
		navigate("/room/profile", { state: { data: item } });
	};
	return (
		<div className='room-card' onClick={() => showPopup(data)}>
			<div className='room-logo'>
				{data.images.length !== 0 && (
					<img
						src={data.images[0].image_url}
						className='image'
						alt='Room image'
					/>
				)}
			</div>
			<div className='name'>{data.room.title}</div>
			<div className='room-details'>
				<p className='paragraph'>
					<b>Size:</b> {data.room.size} sqft
				</p>
				<p className='paragraph'>
					<b>Price:</b> USD {data.room.rent}
				</p>
				{data.discount !== 0 && (
					<p className='paragraph'>
						<b>Discount</b> {data.room.discount}
					</p>
				)}
				{data.discount === 0 && (
					<p className='paragraph'>
						<br />
					</p>
				)}
			</div>
		</div>
	);
}

export default RoomCard;
