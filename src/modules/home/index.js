import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Main from './main';
import BeneficiaryList from '../beneficiary/beneficiaryLists';
import ShareBeneficiary from '../beneficiary/share';
import RegisterBeneficiary from '../beneficiary/register';
import BeneficiaryPhoto from '../beneficiary/photo';
import BeneficiaryId from '../beneficiary/idCard';
import Preview from '../beneficiary/preview';

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={Main} />
				<PrivateRoute exact path="/list" component={BeneficiaryList} />
				<PrivateRoute exact path="/register" component={RegisterBeneficiary} />
				<PrivateRoute exact path="/share" component={ShareBeneficiary} />
				<PrivateRoute exact path="/beneficiary/photo" component={BeneficiaryPhoto} />
				<PrivateRoute exact path="/beneficiary/idcard" component={BeneficiaryId} />
				<PrivateRoute exact path="/beneficiary/preview" component={Preview} />
				<Route path="*" component={Main} />
			</Switch>
			<Footer />
		</>
	);
}

export default App;
