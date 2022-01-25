import React, { useState, useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DataService from '../../services/db';


const BeneficiaryList = () => {
	const history = useHistory();
	const [ben, setBen] = useState([]);

	const getAllBeneficiary = useCallback(async()=>{
		const beneficiaries = await DataService.listBeneficiaries();
		setBen(beneficiaries)
	},[])

	const save = async e => {
		e.preventDefault();
		history.push('/');
	};

	useEffect(() => {
		getAllBeneficiary()
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
						<Form onSubmit={save} className="p-2">
							<ul className="listview image-listview flush">
								{ben.length > 0 &&
									ben.map(ben => {
										return (
											<li key={ben.phone}>
												<div className="item mb-1 mt-1">
													<Form.Group className="mb-0" controlId="formBasicCheckbox">
														<Form.Check key={ben.phone} type="checkbox" label={ben.name} />
													</Form.Group>
												</div>
											</li>
										);
									})}
							</ul>
							<Button type="submit" className="btn btn-lg btn-block btn-success mt-3 mb-2 ">
								Send
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default BeneficiaryList;
