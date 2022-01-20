import React, {
	createContext
	//  useReducer
} from 'react';
// import appReduce from '../reducers/appReducer';

const initialState = {
	address: null
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
	// const [state, dispatch] = useReducer(appReduce, initialState);

	return (
		<AppContext.Provider
			value={
				{
					// dispatch
				}
			}
		>
			{children}
		</AppContext.Provider>
	);
};
