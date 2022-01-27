import axios from 'axios';

import API from '../constants/api';


export async function checkAidConnectId(id) {
	try {
		if (!id) throw new Error('Must send id');
		const {data} = await axios.get(`${API.AID_CONNECT}/${id}`);
		return data;
	} catch (e) {
		throw Error(e);
	}
}
