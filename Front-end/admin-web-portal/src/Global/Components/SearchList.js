const SearchList = ({ data, redirect, loading, error, type }) => {
	if (error) {
		return (
			<div className={type ? "search-list-large" : "search-list"}>
				<div className='search-list-item no-hover'>
					<p>{error}</p>
				</div>
			</div>
		);
	}
	return (
		<div className={type ? "search-list-large" : "search-list"}>
			{loading ? (
				<div className='search-list-item no-hover'>
					<p>Loading...</p>
				</div>
			) : (
				data.map((item) => {
					if (type === "reservation") {
						return (
							<div
								className='search-list-item'
								onClick={() => redirect(item)}
								key={item.id}>
								<p>{item.id}</p>
								<p>{item.customer_object.email}</p>
								<p>{item.reservation_date}</p>
								<p>{item.reservation_end}</p>
							</div>
						);
					}
					return (
						<div
							className='search-list-item'
							onClick={() => redirect(item)}
							key={item.id}>
							<p>{item.username}</p>
							{type && (
								<>
									<p>{item.name}</p>
									<p>{item.email}</p>
									<p>{item.position}</p>
								</>
							)}
						</div>
					);
				})
			)}
		</div>
	);
};

export default SearchList;
