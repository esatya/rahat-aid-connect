import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UnlockedFooter from './UnlockedFooter';
import { AppContext } from '../../contexts/AppContext';

export default function Footer() {
  const history = useHistory();
  const { aidConnectId, isActive } = useContext(AppContext);

  const getInfo = async event => {
    event.preventDefault();
    history.push(`/${aidConnectId}/deactivated-info`);
  };

  return (
    <>
      {!isActive && (
        <div id="toast-17" className="toast-box toast-bottom bg-warning show">
          <div className="in">
            <div className="text">Aid-Connect is currrently Deactivated</div>
          </div>

          <button
            type="button"
            onClick={getInfo}
            className="btn btn-outline-primary btn-sm btn-text-light close-button"
          >
            ?
          </button>
        </div>
      )}
      <UnlockedFooter />
    </>
  );
}
