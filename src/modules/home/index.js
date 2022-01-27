import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Main from './main';
import ErrorPage from '../global/Invalid'
import BeneficiaryList from '../beneficiary/beneficiaryLists';
import ShareBeneficiary from '../beneficiary/share';
import RegisterBeneficiary from '../beneficiary/register';
import BeneficiaryPhoto from '../beneficiary/photo';
import BeneficiaryId from '../beneficiary/idCard';
import Preview from '../beneficiary/preview';
import BeneficiaryDetails from '../beneficiary/beneficiaryDetails'
import DeactivatedInfo from '../global/Info'

function App() {
	return (
		<>
			<Header />
			<Switch>
				<PrivateRoute exact path="/:aidConnectId" component={Main} />
				<PrivateRoute exact path="/:aidConnectId/list" component={BeneficiaryList} />
				<PrivateRoute exact path="/:aidConnectId/register" component={RegisterBeneficiary} />
				<PrivateRoute exact path="/:aidConnectId/share" component={ShareBeneficiary} />
				<PrivateRoute exact path="/:aidConnectId/beneficiary/photo" component={BeneficiaryPhoto} />
				<PrivateRoute exact path="/:aidConnectId/beneficiary/idcard" component={BeneficiaryId} />
				<PrivateRoute exact path="/:aidConnectId/beneficiary/preview" component={Preview} />
				<PrivateRoute exact path="/:aidConnectId/beneficiary/:phone" component={BeneficiaryDetails} />
				<PrivateRoute exact path="/:aidConnectId/deactivated-info" component={DeactivatedInfo}/>
				<Route path="*" component={ErrorPage} />
			</Switch>
			<Footer />
		</>
	);
}

export default App;
