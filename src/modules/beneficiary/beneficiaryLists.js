import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import AppHeader from '../layouts/AppHeader';
import DataService from '../../services/db';
import Avatar from '../../assets/images/Man.png';
import { AppContext } from '../../contexts/AppContext';

const BeneficiaryList = () => {
  const { aidConnectId } = useContext(AppContext);
  const [ben, setBen] = useState([]);

  const getBeneficiaries = useCallback(async () => {
    const bens = await DataService.listBeneficiaries(aidConnectId);
    if (!bens) return;
    setBen(bens);
  }, [aidConnectId]);

  useEffect(() => {
    getBeneficiaries();
  }, [getBeneficiaries]);

  return (
    <>
      <AppHeader
        currentMenu="Beneficiaries"
        actionButton={
          <Link to={`/${aidConnectId}`} className="headerButton">
            <IoHomeOutline className="ion-icon" />
          </Link>
        }
      />

      <div id="appCapsule">
        <div className="section mt-2">
          <div className="card">
            <ul className="listview image-listview flush">
              {ben.length > 0 &&
                ben.map(ben => {
                  return (
                    <li key={ben.phone}>
                      <Link to={`/${aidConnectId}/beneficiary/${ben.phone}`} className="item">
                        <img src={Avatar} width="50" height="50" alt="" className="image" />
                        <div className="in">
                          <div>
                            <div>
                              <strong>{ben.name}</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '14px' }}>{ben.phone}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeneficiaryList;
