import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { MdWebAsset, MdPostAdd } from 'react-icons/md';
import { useIcon } from '../../utils/react-utils';

export default function UnlockedFooter() {
  const { aidConnectId } = useContext(AppContext);

  return (
    <>
      <div className="footer-unlocked">
        <div className="appBottomMenu">
          <Link to={`/${aidConnectId}/list`} className="item">
            <div className="col">
              <MdWebAsset className="ion-icon" />
              <strong>Beneficiary</strong>
            </div>
          </Link>
          <Link to={`/${aidConnectId}/register`} className="item">
            <div className="col">
              <MdPostAdd className="ion-icon" />
              <strong>Register</strong>
            </div>
          </Link>

          <Link to={`/${aidConnectId}/share`} className="item">
            <div className="col">
              {useIcon('IoPersonOutline')}
              <strong>Share</strong>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
