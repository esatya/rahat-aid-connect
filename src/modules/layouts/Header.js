import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';

export default function Header() {
	return (
		<div>
			<div className="appHeader scrolled" style={{ background: '#2b7ec1' }}>
				<div className="left d-none">
					<a href="fake_value" className="headerButton" data-toggle="modal" data-target="#sidebarPanel">
						<IoHomeOutline className="ion-icon" />
					</a>
				</div>
				<div className="pageTitle">
					<img src="assets/img/brand/icon-white-128.png" width="25" alt="logo" className="logo" />
					&nbsp; Rahat Aid Connect
				</div>
			</div>
		</div>
	);
}
