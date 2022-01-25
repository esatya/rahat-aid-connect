import React, {createContext} from 'react';
// import appReduce from '../reducers/appReducer';

const initialState = {
	address: null,
	totalBeneficiary:0,
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
//	const [state, dispatch] = useReducer(appReduce, initialState);



	return (
		<AppContext.Provider
			value={
				{
					//...state
				}
			}
		>
			{children}
		</AppContext.Provider>
	);
};
