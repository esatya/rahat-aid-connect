import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const List = ({ limit, beneficiary = [] }) => {
	const [ben, setBen] = useState([]);

	useEffect(() => {
		setBen(beneficiary);
	}, [setBen, beneficiary]);
	return (
		<>
			<ul className="listview image-listview flush">
				{ben.length > 0 &&
					ben.map(ben => {
						return (
							<li key={ben.id}>
								<Link to={`/ben/${ben.id}`} className="item">
									<img src={ben.icon} width="50" height="50" alt="" className="image" />
									<div className="in">
										<div>
											<div className="mb-05">
												<strong>{ben.name}</strong>
											</div>
										</div>
									</div>
								</Link>
							</li>
						);
					})}
			</ul>
		</>
	);
};

export default List;
