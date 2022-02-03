import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoHomeOutline, IoEye } from 'react-icons/io5';
import { Button } from 'react-bootstrap';
import AppHeader from '../layouts/AppHeader';
import DataService from '../../services/db';
import { AppContext } from '../../contexts/AppContext';
import Info from '../global/Info';

const BeneficiaryList = () => {
  const history = useHistory();
  const { aidConnectId, isActive, sendBeneficiaries, projectName } = useContext(AppContext);
  const [beneficiary, setBeneficiary] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState([]);
  const getAllBeneficiary = useCallback(async () => {
    const beneficiariesList = await DataService.listBeneficiaries();
    setBeneficiary(beneficiariesList);
  }, []);

  const handleSelectAll = e => {
    const { checked } = e.target;
    if (checked) {
      const benPhone = beneficiary.map(b => b.phone);
      setSelectAll(true);
      setSelectedBeneficiary(benPhone);
    } else {
      setSelectAll(false);
      setSelectedBeneficiary([]);
    }
  };

  const handleCheckboxChange = phone => {
    const phoneExist = selectedBeneficiary.includes(phone);
    if (phoneExist) {
      const filterList = selectedBeneficiary.filter(f => f !== phone);
      setSelectedBeneficiary(filterList);
    } else setSelectedBeneficiary([...selectedBeneficiary, phone]);
  };

  const filterSharedBeneficiary = beneficiaries => {
    const unSharedBeneficiary = beneficiaries.filter(el => !el.shared);
    return unSharedBeneficiary.map(el => {
      const { shared, ...rest } = el;
      return rest;
    });
  };

  const handleShare = async () => {
    if (!selectedBeneficiary.length)
      return Swal.fire('Error', 'Beneficiary Not Selected', 'warning');
    const beneficiaries = await Promise.all(
      selectedBeneficiary.map(async el => {
        const { name, phone, address, email, gender, govt_id, shared } =
          await DataService.getBeneficiary(el);
        return {
          name,
          phone,
          address,
          email,
          gender,
          govt_id,
          shared,
        };
      }),
    );
    const filteredBen = filterSharedBeneficiary(beneficiaries);
    if (!filteredBen.length)
      return Swal.fire('Error', 'Selected Beneficiaries Already Shared', 'warning');

    const d = await sendBeneficiaries(filteredBen);
    if (d && d.inserted) {
      await Promise.all(
        selectedBeneficiary.map(async el => {
          await DataService.updateBeneficiary(el, { shared: true });
        }),
      );
      await Swal.fire('Success', `Selected Beneficiaries Shared to Agency`, 'success');
      return history.push(`/${aidConnectId}`);
    }
    Swal.fire('Error', `Something Went Workng! Contact Admin`, 'error');
  };

  useEffect(() => {
    getAllBeneficiary();
  }, [getAllBeneficiary]);

  return (
    <>
      <AppHeader
        currentMenu="Share"
        actionButton={
          <Link to={`/${aidConnectId}`} className="headerButton">
            <IoHomeOutline className="ion-icon" />
          </Link>
        }
      />

      {!isActive ? (
        <Info message="Cannot Share Beneficiary While Link is Deactivated" />
      ) : (
        <div id="appCapsule">
          <div className="section mt-2">
            <h4 className="mt-3">{projectName}</h4>
            <div className="card mt-3">
              <div className="ml-3 mt-1 mb-1">
                {selectedBeneficiary
                  ? `Beneficiary selected:${selectedBeneficiary.length}`
                  : `Beneficiary selected:${0}`}
              </div>
              <div className="wide-block p-0">
                <div className="table-responsive p-1">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <input
                            id="custom-checkbox"
                            onChange={handleSelectAll}
                            type="checkbox"
                            checked={selectAll}
                            value="select all"
                          />
                        </th>
                        <th scope="col">Beneficiary</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beneficiary.length > 0 &&
                        beneficiary.map((ben, index) => {
                          return (
                            <tr key={ben.phone}>
                              <td>
                                <input
                                  id={`custom-checkbox-${index}`}
                                  onChange={() => handleCheckboxChange(ben.phone)}
                                  type="checkbox"
                                  checked={selectedBeneficiary.includes(ben.phone)}
                                  value={ben.phone}
                                />
                              </td>
                              <td>
                                <div>
                                  <strong>{ben.name}</strong>
                                  <br />
                                  {ben.phone}
                                </div>
                              </td>
                              <td>
                                <Link to={`/${aidConnectId}/beneficiary/${ben.phone}`}>
                                  <IoEye
                                    className="ion-icon"
                                    style={{ fontSize: '24px', color: '#2B7EC1' }}
                                  />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Button onClick={handleShare} className="btn btn-lg btn-block btn-success mt-3 mb-2">
              Share
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BeneficiaryList;
