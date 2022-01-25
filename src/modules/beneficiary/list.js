import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/db';
import Avatar from '../../assets/images/Man.png';



const BeneficiaryList = ({ limit }) => {

	const [ben, setBen] = useState([]);

	const getBeneficiaries = useCallback(async ()=>{
		let bens = await DataService.listBeneficiaries();
		if(!bens) return;
		if (limit) bens = bens.slice(0, limit);
		setBen(bens);
	},[limit])

	useEffect(() => {	
	  getBeneficiaries()
	}, [getBeneficiaries]);
	return (
		<>
			<div >
				<div className="section mt-0">
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
