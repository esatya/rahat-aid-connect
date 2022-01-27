import React, { useState, useEffect, useCallback,useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/images/Man.png';
import DataService from '../../services/db';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';
import {AppContext} from '../../contexts/AppContext'

const BeneficiaryDetail = props => {
	const benId = props.match.params.phone;
	const [benData, setBenData] = useState({});
	const {aidConnectId} = useContext(AppContext);
	const [date, setDate] = useState();

	const getBeneficiaryData = useCallback(async () => {
		const data = await DataService.getBeneficiary(benId);
		setBenData(data);
		const d = new Date(data.createdAt).toLocaleDateString();
		setDate(d);
	}, [benId]);

	useEffect(() => {
		getBeneficiaryData();
	}, [getBeneficiaryData]);

	return (
		<>
			<AppHeader
				currentMenu="Beneficiary detail"
				actionButton={
					<Link to={`/${aidConnectId}`} className="headerButton">
						<IoHomeOutline className="ion-icon" />
					</Link>
				}
			/>
			<div id="appCapsule">
				<div className="section mt-2">
					<div className="card">
						<div className="card-body">
							<div className="mt-1 text-center">
								{benData && benData.photo ? (
									<img
										className="video-flipped selfie"
										alt="preview"
										src={benData.photo}
										width="200px"
										height="200px"
									/>
								) : (
									<img
										className="video-flipped selfie "
										alt="preview"
										src={Avatar}
										width="40px"
										height="40px"
									/>
								)}
							</div>
							<ul className="listview flush transparent simple-listview no-space mt-3">
								<li>
									<strong>Name</strong>
									<span>{benData.name}</span>
								</li>
								<li>
									<strong>Phone</strong>
									<span style={{ overflow: 'hidden' }}>{benData.phone}</span>
								</li>
								<li>
									<strong>Address</strong>
									<span style={{ overflow: 'hidden' }}>{benData.address}</span>
								</li>
								<li>
									<strong>Registered At</strong>
									<span style={{ overflow: 'hidden' }}>{date}</span>
								</li>
								<li>
									<strong>Shared status</strong>
									{benData.status ? (
										<span className="text-success" style={{ overflow: 'hidden' }}>
											Success
										</span>
									) : (
										<span className="text-warning" style={{ overflow: 'hidden' }}>
											Pending
										</span>
									)}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default BeneficiaryDetail;
