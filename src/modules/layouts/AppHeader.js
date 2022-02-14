import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as io5 from 'react-icons/io5';
import { AppContext } from '../../contexts/AppContext';

export default function AppHeader({ currentMenu, actionButton, ionIcon }) {
  const history = useHistory();
  const { aidConnectId } = useContext(AppContext);
  const goBack = () => history.goBack();
  const titleIcon = ionIcon
    ? React.createElement(io5[ionIcon], { className: 'ion-icon', style: { fontSize: 22 } })
    : '';
  return (
    <div className="appHeader text-light" style={{ background: '#2b7ec1' }}>
      <div className="left">
        <button onClick={goBack} className="btn btn-text headerButton goBack">
          <io5.IoChevronBackOutline className="ion-icon" />
        </button>
      </div>
      {titleIcon}
      <div className="pageTitle">{currentMenu || 'Home'}</div>
      <div className="right">
        {actionButton !== undefined ? (
          <>{actionButton}</>
        ) : (
          <Link to={`/${aidConnectId}`} className="headerButton">
            <io5.IoHomeOutline className="ion-icon" />
          </Link>
        )}
      </div>
    </div>
  );
}
