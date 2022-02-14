import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Avatar from '../../assets/images/Man.png';
import DataService from '../../services/db';
import AppHeader from '../layouts/AppHeader';
import { AppContext } from '../../contexts/AppContext';
import { AiOutlineEdit } from 'react-icons/ai';

const BeneficiaryDetail = props => {
  const history = useHistory();
  const benId = props.match.params.phone;
  const [benData, setBenData] = useState({});
  const { aidConnectId } = useContext(AppContext);
  const [date, setDate] = useState();

  const getBeneficiaryData = useCallback(async () => {
    const data = await DataService.getBeneficiary(benId);
    setBenData(data);
    const d = new Date(data.createdAt).toLocaleDateString();
    setDate(d);
  }, [benId]);

  const handleDelete = async () => {
    await DataService.deleteBeneficiary(benId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        history.push(`/${aidConnectId}/list`);
      }
    });
  };

  useEffect(() => {
    getBeneficiaryData();
  }, [getBeneficiaryData]);

  return (
    <>
      <AppHeader
        currentMenu="Beneficiary detail"
        actionButton={<RiDeleteBin6Line className="ion-icon" onClick={handleDelete} />}
      />
      <div id="appCapsule">
        <div className="section mt-2">
          <div className="card">
            <div className="card-body">
              <div className="text-right">
                <Link to={`/${aidConnectId}/edit/${benData.phone}`}>
                  <AiOutlineEdit style={{ fontSize: '24px' }} />
                </Link>
              </div>

              <div className="mt-1 text-center">
                {benData && benData.photo ? (
                  <img
                    className="video-flipped selfie"
                    alt="preview"
                    src={benData.photo}
                    width="200px"
                    height="200px"
                  />
                ) : (
                  <img
                    className="video-flipped selfie "
                    alt="preview"
                    src={Avatar}
                    width="40px"
                    height="40px"
                  />
                )}
              </div>
              <ul className="listview flush transparent simple-listview no-space mt-3">
                <li>
                  <strong>Name</strong>
                  <span>{benData.name}</span>
                </li>
                <li>
                  <strong>Phone</strong>
                  <span style={{ overflow: 'hidden' }}>{benData.phone}</span>
                </li>
                <li>
                  <strong>Address</strong>
                  <span style={{ overflow: 'hidden' }}>{benData.address}</span>
                </li>
                <li>
                  <strong>Registered At</strong>
                  <span style={{ overflow: 'hidden' }}>{date}</span>
                </li>
                <li>
                  <strong>Shared status</strong>
                  {benData.shared ? (
                    <span className="text-success" style={{ overflow: 'hidden' }}>
                      Success
                    </span>
                  ) : (
                    <span className="text-warning" style={{ overflow: 'hidden' }}>
                      Pending
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BeneficiaryDetail;
