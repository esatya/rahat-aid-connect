import axios from 'axios';

import API from '../constants/api';

export async function checkAidConnectId(aidConnectId) {
  try {
    if (!aidConnectId) throw new Error('Must send aidConnectId');
    const { data } = await axios.get(`${API.AID_CONNECT}/${aidConnectId}`);
    return data;
  } catch (e) {
    throw Error(e);
  }
}

export async function sendBeneficiaries(aidConnectId, payload) {
  try {
    if (!aidConnectId) throw new Error('Must send aidConnectId');
    const { data } = await axios({
      url: `${API.AID_CONNECT}/${aidConnectId}/beneficiaries`,
      method: 'post',
      data: payload,
    });
    return data;
  } catch (e) {
    throw Error(e);
  }
}
