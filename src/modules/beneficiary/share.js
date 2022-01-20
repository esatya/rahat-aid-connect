import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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
	const history = useHistory();
	const [ben, setBen] = useState([]);

	const save = async e => {
		e.preventDefault();
		history.push('/');
	};

	useEffect(() => {
		setBen(beneficiary);
	}, [setBen]);
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
											<li key={ben.id}>
												<div className="item mb-1 mt-1">
													<Form.Group className="mb-0" controlId="formBasicCheckbox">
														<Form.Check key={ben.id} type="checkbox" label={ben.name} />
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
