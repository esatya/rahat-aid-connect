import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoChevronBackOutline, IoHomeOutline } from 'react-icons/io5';
import { ImageGroup, Image } from 'react-fullscreen-image';
// import image from '../../../public/assets/img/brand/icon-192.png';
import { Row, Col } from 'react-bootstrap';
import DataService from '../../services/db';
import AppHeader from '../layouts/AppHeader';
import { RegisterBeneficiaryContext } from '../../contexts/registerBeneficiaryContext';
import { AppContext } from '../../contexts/AppContext';

export default function Preview() {
  const history = useHistory();
  const { aidConnectId } = useContext(AppContext);
  const { name, phone, address, gender, photo, email, govt_id, govt_id_image, resetBeneficiary } =
    useContext(RegisterBeneficiaryContext);

  const handleRegister = async event => {
    event.preventDefault();
    await DataService.addBeneficiary({
      aid_connect_id: aidConnectId,
      name,
      phone,
      address,
      email: email || '',
      gender,
      govt_id: govt_id || '',
      photo,
      govt_id_image,
      createdAt: Date.now(),
      shared: false,
    });
    resetBeneficiary();
    history.push(`/${aidConnectId}`);
  };

  return (
    <>
      <AppHeader
        currentMenu="Register Beneficiary"
        backButton={
          <Link to={`/${aidConnectId}/beneficiary/idcard`} className="headerButton goBack">
            <IoChevronBackOutline className="ion-icon" />
          </Link>
        }
        actionButton={
          <Link to={`/${aidConnectId}`} className="headerButton">
            <IoHomeOutline className="ion-icon" />
          </Link>
        }
      />
      <div id="appCapsule">
        <div className="section mt-2">
          <div className="card">
            <div
              className="card-body"
              style={{
                paddingTop: '0px',
              }}
            >
              <ul className="listview flush transparent simple-listview no-space mt-3">
                <li>
                  <strong>Name:</strong>
                  <span>{name}</span>
                </li>
                <li>
                  <strong>Phone:</strong>
                  <span>{phone}</span>
                </li>
                <li>
                  <strong>Address:</strong>
                  <span>
                    <span>{address}</span>
                  </span>
                </li>
                <li>
                  <strong>Gender</strong>
                  <span>{gender}</span>
                </li>
              </ul>
              <ImageGroup>
                <Row className="mt-2 mb-4 previewImage">
                  <Col xs={6} className="previewImg mb-2">
                    <Image
                      src={photo || '/assets/img/brand/icon-192.png'}
                      alt="profile_photo"
                      style={{
                        height: '200px',
                        width: '200px',
                      }}
                    />
                  </Col>
                  <Col xs={6} className="previewImg">
                    <Image
                      src={govt_id_image || '/assets/img/brand/icon-192.png'}
                      alt="id_card"
                      style={{
                        height: '200px',
                        width: '200px',
                      }}
                    />
                  </Col>
                </Row>
              </ImageGroup>

              <button
                type="button"
                id="btncharge"
                className="btn btn-lg btn-block btn-success mb-3"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
