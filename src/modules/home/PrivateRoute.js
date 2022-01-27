import React,{useContext,useEffect} from 'react';
import { Route } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import Invalid from '../global/Invalid';
 

 function PrivateRoute({ component: Component, ...rest }) {
	const { checkAidConnectId,aidConnectId,isActive } = useContext(AppContext);
	const {aidConnectId:_aidConnectId} = rest.computedMatch.params
	useEffect(()=>{
		checkAidConnectId(_aidConnectId)
	},[checkAidConnectId,_aidConnectId])
	console.log({aidConnectId,isActive})

	// const data = await 
	return (
		<Route
			{...rest}
			render={props => {
				if(isActive) return <Component {...props} {...rest} />; 
				else {
					return 	<Invalid message="Invalid Aid-Connect Link" />
				}
			}}
		/>
	);
}

export default PrivateRoute;
