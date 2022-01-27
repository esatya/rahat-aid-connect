import React, {createContext,useCallback,useReducer} from 'react';
import appReduce from '../reducers/appReducer';
import * as Service from '../services';
import APP_ACTIONS from '../actions/appActions';



const initialState = {
	address: null,
	totalBeneficiary:0,
	aidConnectId:null,
	isActive:false
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(appReduce, initialState);

const checkAidConnectId = useCallback(async (_aidConnectId) => {
	const {data} = await Service.checkAidConnectId(_aidConnectId);
	dispatch({ type: APP_ACTIONS.SET_AID_CONNECT_ID, data: {aidConnectId:data.id,isActive:data.isActive} });
},[])



	return (
		<AppContext.Provider
			value={
				{
				...state,
				checkAidConnectId
				}
			}
		>
			{children}
		</AppContext.Provider>
	);
};
