import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './home';
import Errorpage from './global/Invalid';
import { AppContextProvider } from '../contexts/AppContext';
import { RegisterBeneficiaryContextProvider } from '../contexts/registerBeneficiaryContext';

function App() {
  return (
    <>
      <AppContextProvider>
        <RegisterBeneficiaryContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="*" component={Errorpage} />
            </Switch>
          </BrowserRouter>
        </RegisterBeneficiaryContextProvider>
      </AppContextProvider>
    </>
  );
}

export default App;
