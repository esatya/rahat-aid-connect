import React, { createContext, useReducer } from 'react';
import BenificiaryReduce from '../reducers/beneficiaryReducer';
import BENEFICIARY_ACTIONS from '../actions/beneficiaryActions';
// import DataService from '../services/db';

const initialState = {
	name: '',
	phone: '',
	gender: '',
	dob: '',
	agency: '',
	email: '',
	address: '',
	address_temporary: '',
	govt_id: '',
	photo: '',
	govt_id_image: '',
	extras: {
		profession: '',
		education: '',
		family_members: '',
		adult: '',
		child: '',
		age: '',
		group: ''
	}
};

export const RegisterBeneficiaryContext = createContext(initialState);
export const RegisterBeneficiaryContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(BenificiaryReduce, initialState);
	const setBeneficiaryDetails = beneficiary => {
		dispatch({ type: BENEFICIARY_ACTIONS.SET_BENEFICIARY_DETAILS, data: beneficiary });
	};

	const setBeneficiaryPhone = phone => {
		dispatch({ type: BENEFICIARY_ACTIONS.SET_PHONE, phone: phone });
	};

	const setBeneficiaryPhoto = photo => {
		dispatch({ type: BENEFICIARY_ACTIONS.SET_PHOTO, photo: photo });
	};

	const setBeneficiaryIdImage = idImage => {
		dispatch({ type: BENEFICIARY_ACTIONS.SET_ID_IMAGE, idImage: idImage });
	};

	const resetBeneficiary = () => {
		dispatch({ type: BENEFICIARY_ACTIONS.RESET, data: initialState });
	};

	// const addBeneficiary = async signature => {
	// 	const project = await DataService.getDefaultProject();
	// 	return Service.registerBeneficiary(signature, { ...state, projects: project.id });
	// };

	// const initData = defaultData => {
	// 	let newData = Object.assign({}, defaultData);
	// 	updateData(newData);
	// 	return newData;
	// };

	return (
		<RegisterBeneficiaryContext.Provider
			value={{
				...state,
				...state.extras,
				setBeneficiaryDetails,
				setBeneficiaryPhone,
				setBeneficiaryPhoto,
				resetBeneficiary,
				setBeneficiaryIdImage
			}}
		>
			{children}
		</RegisterBeneficiaryContext.Provider>
	);
};
