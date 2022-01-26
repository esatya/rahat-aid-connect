import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';
import DataService from '../../services/db';
import Avatar from '../../assets/images/Man.png';

const BeneficiaryList = () => {
	const [ben, setBen] = useState([]);

	const getBeneficiaries = useCallback(async () => {
		let bens = await DataService.listBeneficiaries();
		if (!bens) return;
		setBen(bens);
	}, []);

	useEffect(() => {
		getBeneficiaries();
	}, [getBeneficiaries]);

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
										<li key={ben.phone}>
											<Link to={`/beneficiary/${ben.phone}`} className="item">
												<img src={Avatar} width="50" height="50" alt="" className="image" />
												<div className="in">
													<div>
														<div>
															<strong>{ben.name}</strong>
														</div>
														<div>
															<span style={{ fontSize: '14px' }}>{ben.phone}</span>
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
