import APP_ACTIONS from '../actions/appActions';

const AppReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_AID_CONNECT_ID:
      return {
        ...state,
        aidConnectId: action.data.aidConnectId,
        isActive: action.data.isActive,
        projectName: action.data.projectName,
        projectId: action.data.projectId,
      };

    case APP_ACTIONS.SET_AID_CONNECT_STATUS:
      return {
        ...state,
        isActive: action.data.isActive,
      };

    default:
      return state;
  }
};

export default AppReducer;
