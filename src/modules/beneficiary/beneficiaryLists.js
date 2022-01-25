import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { IoHomeOutline } from 'react-icons/io5';
import List from './list';

const BeneficiaryList = () => {
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
				<div className="section full">
				<List/>
				</div>
			</div>

		</>
	);
};

export default BeneficiaryList;
