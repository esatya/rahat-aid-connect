import React from 'react';
import { Link } from 'react-router-dom';
import List from '../beneficiary/list';

const recentBen = [
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
export default function Main() {
	return (
		<>
			<div id="appCapsule">
				<div className="section wallet-card-section pt-2">
					<div className="wallet-card">
						<div className="balance">
							<h3 className="title">Wash Programme</h3>
						</div>
						<div className="balance mt-3">
							<div className="left">
								<h1 className="total">3000</h1>
								<span className="">Total beneficiaries</span>
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

							<Link to="/list" className="link" style={{ marginRight: '16px' }}>
								View All
							</Link>
						</div>
						<div
							className="card-body"
							style={{
								paddingTop: '0px'
							}}
						>
							<List limit="3" beneficiary={recentBen} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
