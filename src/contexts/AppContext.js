import React, { createContext, useCallback, useReducer } from 'react';
import appReduce from '../reducers/appReducer';
import * as Service from '../services';
import APP_ACTIONS from '../actions/appActions';

const initialState = {
  aidConnectId: null,
  isActive: false,
  projectName: '',
  projectId: '',
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReduce, initialState);

  const isStoragePersisted = async () => {
    return (
      (await navigator.storage) && navigator.storage.persisted && navigator.storage.persisted()
    );
  };

  const persist = async () => {
    try {
      return (await navigator.storage) && navigator.storage.persist && navigator.storage.persist();
    } catch (e) {
      console.log(e);
    }
  };

  const checkAidConnectId = useCallback(async _aidConnectId => {
    const { data } = await Service.checkAidConnectId(_aidConnectId);
    const isPersisted = await isStoragePersisted();
    if (isPersisted) {
      console.log(':) Storage is successfully persisted.');
    } else {
      console.log(':( Storage is not persisted.');
      console.log('Trying to persist..:');
      if (await persist()) {
        console.log(':) We successfully turned the storage to be persisted.');
      } else {
        console.log(':( Failed to make storage persisted');
      }
    }

    dispatch({
      type: APP_ACTIONS.SET_AID_CONNECT_ID,
      data: {
        aidConnectId: data.id,
        isActive: data.isActive,
        projectName: data.projectName,
        projectId: data.projectId,
      },
    });
  }, []);

  const sendBeneficiaries = async beneficiaries => {
    const data = await Service.sendBeneficiaries(state.aidConnectId, beneficiaries);
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        checkAidConnectId,
        sendBeneficiaries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
