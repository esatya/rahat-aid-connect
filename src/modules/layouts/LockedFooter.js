import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoLockClosed } from 'react-icons/io5';
import Loading from '../global/Loading';

export default function LockedFooter() {
	let history = useHistory();
	const [loadingModal, setLoadingModal] = useState(false);

	const handleUnlockClick = async () => {
		setLoadingModal(true);

		history.push('/');
		setLoadingModal(false);
	};
	//setTimeout(handleUnlockClick, 1000);

	return (
		<>
			<Loading message="Unlocking your wallet. Please wait..." showModal={loadingModal} />
			<div className="footer-locked">
				<div className="appBottomMenu">
					<a href="#target" className="item">
						<div className="col"></div>
					</a>
					<a href="#target" className="item">
						<div className="col"></div>
					</a>
					<a
						title="Tap here to unlock"
						href="#screen"
						className="item"
						id="btnUnlock"
						onClick={handleUnlockClick}
					>
						<div className="col">
							<div className="action-button large">
								<IoLockClosed className="ion-icon" />
							</div>
						</div>
					</a>
					<a href="#target" className="item">
						<div className="col"></div>
					</a>
					<a href="#target" className="item">
						<div className="col"></div>
					</a>
				</div>
			</div>
		</>
	);
}
