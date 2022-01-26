import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline, IoEye } from 'react-icons/io5';
// import { Form, Button } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import DataService from '../../services/db';

const BeneficiaryList = () => {
	// const history = useHistory();
	const [ben, setBen] = useState({});

	const [checkedState, setCheckedState] = useState(new Array(ben.length).fill(false));
	const [selectAll, setSelectAll] = useState(false);

	const getAllBeneficiary = useCallback(async () => {
		const beneficiaries = await DataService.listBeneficiaries();
		setBen(beneficiaries);
	}, []);

	const handleSelectAll = () => {
		const updatedCheckedState = checkedState.map(item => {
			return !selectAll;
		});
		setSelectAll(!selectAll);
		setCheckedState(updatedCheckedState);
	};

	const handleOnChange = position => {
		const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
		setCheckedState(updatedCheckedState);
	};

	useEffect(() => {
		getAllBeneficiary();
	}, [getAllBeneficiary]);
	return (
		<>
			<AppHeader
				currentMenu="Share"
				actionButton={
					<Link to="/" className="headerButton">
						<IoHomeOutline className="ion-icon" />
					</Link>
				}
			/>
			<div id="appCapsule">
				<div className="section mt-2">
					<h4 className="mt-3">Wash programme</h4>
					<div className="card mt-3">
						<div className="wide-block p-0">
							<div className="table-responsive">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">
												<input
													id="custom-checkbox"
													onChange={handleSelectAll}
													type="checkbox"
													checked={selectAll}
													value="select all"
												/>
											</th>
											<th scope="col">Beneficiary</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{ben.length > 0 &&
											ben.map((ben, index) => {
												return (
													<tr key={ben.phone}>
														<td>
															<input
																id={`custom-checkbox-${index}`}
																onChange={() => handleOnChange(index)}
																type="checkbox"
																checked={checkedState[index]}
																value={ben.phone}
															/>
														</td>
														<td>
															<div>
																<strong>{ben.name}</strong>
																<br />
																{ben.phone}
															</div>
														</td>
														<td>
															<Link to={`/beneficiary/${ben.phone}`}>
																<IoEye
																	className="ion-icon"
																	style={{ fontSize: '24px', color: '#2B7EC1' }}
																/>
															</Link>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BeneficiaryList;
