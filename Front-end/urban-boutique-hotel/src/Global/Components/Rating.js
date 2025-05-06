import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rate }) => {
	const fillStar = Math.floor(rate);
	const halfStar = Math.round(rate - fillStar);
	const emptyStar = Math.max(0, 5 - fillStar - halfStar);

	return (
		<div className='review-rating'>
			{[...Array(fillStar)].map((_, i) => (
				<FaStar key={i} />
			))}
			{[...Array(halfStar)].map((_, i) => (
				<FaStarHalfAlt key={i} />
			))}
			{[...Array(emptyStar)].map((_, i) => (
				<FaRegStar key={i} />
			))}
		</div>
	);
};

export default Rating;
