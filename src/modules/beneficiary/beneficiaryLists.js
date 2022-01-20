import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';

const beneficiary = [
	{
		id: 1,
		name: 'superman',
		icon: '/assets/img/brand/icon-192.png'
	},
	{
		id: 2,
		name: 'ironman',
		icon: '/assets/img/brand/icon-192.png'
	}
];

const BeneficiaryList = () => {
	const [ben, setBen] = useState([]);

	useEffect(() => {
		setBen(beneficiary);
	}, [setBen]);
	return (
		<>
			<AppHeader
				currentMenu="Beneficiaries"
				actionButton={
					<Link to="/" className="headerButton">
						<IoHomeOutline className="ion-icon" />
					</Link>
				}
			/>
			<div id="appCapsule">
				<div className="section mt-2">
					<div className="card">
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
					</div>
				</div>
			</div>
		</>
	);
};

export default BeneficiaryList;
