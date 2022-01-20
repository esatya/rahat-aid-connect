import React from 'react';
import { Link } from 'react-router-dom';
import { MdWebAsset, MdPostAdd } from 'react-icons/md';
import { useIcon } from '../../utils/react-utils';

export default function UnlockedFooter() {
	return (
		<>
			<div className="footer-unlocked">
				<div className="appBottomMenu">
					<Link to="/list" className="item">
						<div className="col">
							<MdWebAsset className="ion-icon" />
							<strong>Beneficiary</strong>
						</div>
					</Link>
					<Link to="/add" className="item">
						<div className="col">
							<MdPostAdd className="ion-icon" />
							<strong>Add</strong>
						</div>
					</Link>

					<Link to="/share" className="item">
						<div className="col">
							{useIcon('IoPersonOutline')}
							<strong>Share</strong>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
