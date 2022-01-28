import React, {createContext,useCallback,useReducer} from 'react';
import appReduce from '../reducers/appReducer';
import * as Service from '../services';
import APP_ACTIONS from '../actions/appActions';



const initialState = {
	aidConnectId:null,
	isActive:false,
	projectName:'',
	projectId:''
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(appReduce, initialState);

const checkAidConnectId = useCallback(async (_aidConnectId) => {
	const {data} = await Service.checkAidConnectId(_aidConnectId);
	dispatch({ type: APP_ACTIONS.SET_AID_CONNECT_ID, 
		data: {aidConnectId:data.id,isActive:data.isActive,projectName:data.projectName,projectId:data.projectId} });
},[])

const sendBeneficiaries = async(beneficiaries) => {
	const data = await Service.sendBeneficiaries(state.aidConnectId,beneficiaries);
	return data;
}



	return (
		<AppContext.Provider
			value={
				{
				...state,
				checkAidConnectId,
				sendBeneficiaries
				}
			}
		>
			{children}
		</AppContext.Provider>
	);
};
