import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../modules/home';
import { AppContextProvider } from '../contexts/AppContext';

function App() {
	return (
		<>
			<AppContextProvider>
				<BrowserRouter>
					<Switch>
						<Route path="/" component={Home} />
						<Route path="*" component={Home} />
					</Switch>
				</BrowserRouter>
			</AppContextProvider>
		</>
	);
}

export default App;
