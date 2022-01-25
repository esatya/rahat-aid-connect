import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../modules/home';
import { AppContextProvider } from '../contexts/AppContext';
import { RegisterBeneficiaryContextProvider} from '../contexts/registerBeneficiaryContext'

function App() {
	return (
		<>
			<AppContextProvider>
				<RegisterBeneficiaryContextProvider>
				<BrowserRouter>
					<Switch>
						<Route path="/" component={Home} />
						<Route path="*" component={Home} />
					</Switch>
				</BrowserRouter>
				</RegisterBeneficiaryContextProvider>
			</AppContextProvider>
		</>
	);
}

export default App;
