import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { useHistory } from 'react-router-dom';
import { IoChevronBackOutline, IoHomeOutline } from 'react-icons/io5';
import { RegisterBeneficiaryContext } from '../../contexts/registerBeneficiaryContext';
import DataService from '../../services/db'
// import image from '../../../public/assets/img/brand/icon-192.png';

export default function Preview() {
	const history = useHistory();
	const { name,phone,address,gender,photo,govt_id_image,resetBeneficiary } = useContext(RegisterBeneficiaryContext);

	const handleRegister = async event => {
		event.preventDefault();
		await DataService.addBeneficiary({
			name,
			phone,
			address,
			photo,
			govt_id_image,
			createdAt: Date.now()
		})
		resetBeneficiary();
		history.push('/');
	};

	return (
		<>
			<AppHeader
				currentMenu="Register Beneficiary"
				backButton={
					<Link to="/beneficiary/idcard" className="headerButton goBack">
						<IoChevronBackOutline className="ion-icon" />
					</Link>
				}
				actionButton={
					<Link to="/" className="headerButton">
						<IoHomeOutline className="ion-icon" />
					</Link>
				}
			/>
			<div id="appCapsule">
				<div className="section mt-2">
					<div className="card">
						<div
							className="card-body"
							style={{
								paddingTop: '0px'
							}}
						>
							<ul className="listview flush transparent simple-listview no-space mt-3">
								<li>
									<strong>Name:</strong>
									<span>{name}</span>
								</li>
								<li>
									<strong>Phone:</strong>
									<span>{phone}</span>
								</li>
								<li>
									<strong>Address:</strong>
									<span>
										<span>{address}</span>
									</span>
								</li>
								<li>
									<strong>Gender</strong>
									<span>{gender}</span>
								</li>
							</ul>
							<div className="d-flex justify-content-around mt-3">
								<img
									// src={`https://ipfs.rumsan.com/ipfs//${nft.metadata.packageImgURI}`}
									src={photo ? photo : '/assets/img/brand/icon-192.png'}
									width="100"
									height="100"
									alt="profile_photo"
									className="image"
								/>
								<img
									// src={`https://ipfs.rumsan.com/ipfs//${nft.metadata.packageImgURI}`}
									src={govt_id_image ? govt_id_image : '/assets/img/brand/icon-192.png'}
									width="100"
									height="100"
									alt="id_card"
									className="image"
								/>
							</div>

							<button
								type="button"
								id="btncharge"
								className="btn btn-lg btn-block btn-success mt-4 mb-3"
								onClick={handleRegister}
							>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
