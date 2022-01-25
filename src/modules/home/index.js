import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Main from './main';
import BeneficiaryList from '../beneficiary/beneficiaryLists';
import ShareBeneficiary from '../beneficiary/share';
import AddBeneficiary from '../beneficiary/add';
import BeneficiaryPhoto from '../beneficiary/photo';
import BeneficiaryId from '../beneficiary/idCard';
import Preview from '../beneficiary/preview';
import BeneficiaryDetails from '../beneficiary/beneficiaryDetails'

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={Main} />
				<PrivateRoute exact path="/list" component={BeneficiaryList} />
				<PrivateRoute exact path="/add" component={AddBeneficiary} />
				<PrivateRoute exact path="/share" component={ShareBeneficiary} />
				<PrivateRoute exact path="/beneficiary/photo" component={BeneficiaryPhoto} />
				<PrivateRoute exact path="/beneficiary/idcard" component={BeneficiaryId} />
				<PrivateRoute exact path="/beneficiary/preview" component={Preview} />
				<PrivateRoute exact path="/beneficiary/:phone" component={BeneficiaryDetails} />
				<Route path="*" component={Main} />
			</Switch>
			<Footer />
		</>
	);
}

export default App;
