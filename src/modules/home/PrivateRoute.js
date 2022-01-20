import React from 'react';
import { Route } from 'react-router-dom';

function PrivateRoute({ component: Component, wallet, ...rest }) {
	return (
		<Route
			{...rest}
			render={props => {
				return <Component {...props} {...rest} />;
			}}
		/>
	);
}

export default PrivateRoute;
