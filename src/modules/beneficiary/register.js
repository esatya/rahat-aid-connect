import React, { useContext } from 'react';
import { Form, Button, Accordion, Card } from 'react-bootstrap';
import { IoCloseCircle, IoHomeOutline, IoChevronDownOutline } from 'react-icons/io5';
import { RegisterBeneficiaryContext } from '../../contexts/registerBeneficiaryContext';
import { useHistory } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { Link } from 'react-router-dom';
import {AppContext} from '../../contexts/AppContext'


const AddBeneficiary = () => {
	const history = useHistory();
	const {aidConnectId} = useContext(AppContext);
	const {
		setBeneficiaryDetails,
		name,
		phone,
		address,
		address_temporary,
		age,
		email,
		govt_id,
		profession,
		education,
		family_members,
		adult,
		child
	} = useContext(RegisterBeneficiaryContext);

	const updateBeneficiaryData = e => {
		let formData = new FormData(e.target.form);
		let data = {};
		formData.forEach((value, key) => {
			data[key] = value;
			if (data[key] === '') data[key] = null;
		});
		setBeneficiaryDetails(data);
	};

	const save = async e => {
		e.preventDefault();
		history.push(`/${aidConnectId}/beneficiary/photo`);
	};
	return (
		<>
			<AppHeader
				currentMenu="Register Beneficiary"
				actionButton={
					<Link to={`/${aidConnectId}`} className="headerButton">
						<IoHomeOutline className="ion-icon" />
					</Link>
				}
			/>

			<div id="appCapsule">
				<div className="section mt-3">
					<Form onSubmit={save}>
						{/* <div className="card">
							<div className="card-body"> */}
						<Accordion defaultActiveKey="0" style={{ borderRadius: '10px' }}>
							<Card>
								<Accordion.Toggle as={Card.Header} eventKey="0" style={{ color: '#2b7ec1' }}>
									<div className="d-flex justify-content-between align-items-center">
										<span>Required fields</span> <IoChevronDownOutline className="ion-icon" />
									</div>
								</Accordion.Toggle>

								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Full Name *</label>
												<Form.Control
													type="text"
													name="name"
													className="form-control"
													placeholder="Enter your full name"
													value={name ? name : ''}
													onChange={updateBeneficiaryData}
													required
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Phone *</label>
												<Form.Control
													type="number"
													className="form-control"
													name="phone"
													placeholder="Enter mobile number"
													value={phone ? phone : ''}
													onChange={updateBeneficiaryData}
													onKeyDown={e => {
														if (['-', '+', 'e'].includes(e.key)) {
															e.preventDefault();
														}
													}}
													required
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Permanent address *</label>
												<Form.Control
													type="text"
													className="form-control"
													name="address"
													placeholder="Enter permanent address"
													value={address ? address : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>

							<Card>
								<Accordion.Toggle as={Card.Header} eventKey="1" style={{ color: '#2b7ec1' }}>
									<div className="d-flex justify-content-between align-items-center">
										<span>Advance fields</span> <IoChevronDownOutline className="ion-icon" />
									</div>
								</Accordion.Toggle>

								<Accordion.Collapse eventKey="1">
									<Card.Body>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Temporary address</label>
												<Form.Control
													type="text"
													className="form-control"
													name="address_temporary"
													placeholder="Enter temporary address"
													value={address_temporary}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Age</label>
												<Form.Control
													type="number"
													className="form-control"
													name="age"
													placeholder="Enter age"
													value={age ? age : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label" htmlFor="gender">
													Gender
												</label>
												<select className="form-control custom-select" id="gender">
													<option value="U">Select gender</option>
													<option value="M">Male</option>
													<option value="F">Female</option>
													<option value="O">Other</option>
												</select>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Email Address</label>
												<Form.Control
													type="email"
													className="form-control"
													name="email"
													placeholder="Enter email"
													value={email ? email : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Citizenship Id</label>
												<Form.Control
													type="text"
													className="form-control"
													name="govt_id"
													placeholder="Enter address"
													value={govt_id ? govt_id : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Education</label>
												<Form.Control
													type="text"
													name="education"
													className="form-control"
													placeholder="Enter education"
													value={education ? education : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Profession</label>
												<Form.Control
													type="text"
													name="profession"
													className="form-control"
													placeholder="Enter profession"
													value={profession ? profession : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Family members</label>
												<Form.Control
													type="number"
													className="form-control"
													name="family_members"
													placeholder="Enter number of family members"
													value={family_members ? family_members : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Adults</label>
												<Form.Control
													type="number"
													className="form-control"
													name="adult"
													placeholder="Enter number of adults"
													value={adult ? adult : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>{' '}
										<div className="form-group basic">
											<div className="input-wrapper">
												<label className="label">Child</label>
												<Form.Control
													type="number"
													className="form-control"
													name="child"
													placeholder="Enter number of children"
													value={child ? child : ''}
													onChange={updateBeneficiaryData}
												/>
												<i className="clear-input">
													<IoCloseCircle className="ion-icon" />
												</i>
											</div>
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/* </div>
						</div> */}
						<Button type="submit" className="btn btn-lg btn-block btn-success mt-3 mb-2">
							Continue
						</Button>
					</Form>
				</div>
			</div>
		</>
	);
};

export default AddBeneficiary;
