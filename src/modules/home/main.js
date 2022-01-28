import React, { useEffect, useState, useCallback,useContext } from 'react';
import { Link } from 'react-router-dom';
import BeneficiaryList from '../beneficiary/list';
import DataService from '../../services/db';
import {AppContext} from '../../contexts/AppContext';

export default function Main() {
	const [totalBen, setTotalBen] = useState(0);
	const {aidConnectId,projectName}  = useContext(AppContext);
	const getTotalBeneficiary = useCallback(async () => {
		const beneficiaries = await DataService.listBeneficiaries();
		setTotalBen(beneficiaries.length);
	}, []);

	useEffect(() => {
		getTotalBeneficiary();
	}, [getTotalBeneficiary]);

	return (
		<>
			<div id="appCapsule">
				<div className="section wallet-card-section pt-2">
					<div className="wallet-card">
						<div className="balance">
							<h3 className="title">{projectName}</h3>
						</div>
						<div className="balance mt-2">
							<div className="left">
								<span className="">Total beneficiaries</span>
							</div>
							<div className="right">
								<h1 className="total">{totalBen}</h1>
							</div>
						</div>
					</div>
				</div>
				<div className="section mt-2">
					<div className="card">
						<div
							className="section-heading"
							style={{
								marginBottom: '0px'
							}}
						>
							<div
								className="card-header"
								style={{
									borderBottom: '0px'
								}}
							>
								Recent Beneficiaries
							</div>

							<Link to={`/${aidConnectId}/list`} className="link" style={{ marginRight: '16px' }}>
								View All
							</Link>
						</div>
						<div className="card-body pt-1">
							<BeneficiaryList limit="3" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
