import React, { useState, useEffect, useCallback,useContext } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/db';
import Avatar from '../../assets/images/Man.png';
import {AppContext} from '../../contexts/AppContext'

const List = ({ limit }) => {
	const [ben, setBen] = useState([]);
	const {aidConnectId} = useContext(AppContext);
	const getBeneficiaries = useCallback(async () => {
		let bens = await DataService.listBeneficiaries();
		if (!bens) return;
		if (limit) bens = bens.slice(0, limit);
		setBen(bens);
	}, [limit]);

	useEffect(() => {
		getBeneficiaries();
	}, [getBeneficiaries]);

	return (
		<>
			<ul className="listview image-listview flush">
				{ben.length > 0 &&
					ben.map(ben => {
						return (
							<li key={ben.phone}>
								<Link to={`/${aidConnectId}/beneficiary/${ben.phone}`} className="item pl-0">
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
		</>
	);
};

export default List;
