import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form, Button, Accordion, Card } from 'react-bootstrap';
import { IoCloseCircle, IoHomeOutline, IoChevronDownOutline } from 'react-icons/io5';
import { useHistory, Link } from 'react-router-dom';
import { RegisterBeneficiaryContext } from '../../contexts/registerBeneficiaryContext';
import AppHeader from '../layouts/AppHeader';
import { AppContext } from '../../contexts/AppContext';
import DataService from '../../services/db';
import Swal from 'sweetalert2';

const AddBeneficiary = () => {
  const history = useHistory();
  const { aidConnectId } = useContext(AppContext);
  const {
    setBeneficiaryDetails,
    name,
    phone,
    address,
    address_temporary,
    age,
    email,
    govt_id,
    profession,
    education,
    family_members,
    adult,
    child,
  } = useContext(RegisterBeneficiaryContext);
  const [beneficiaryPhone, setBeneficiaryPhone] = useState([]);

  const getBeneficiary = useCallback(async () => {
    let bens = await DataService.listBeneficiaries();
    const beneficiariesPhone = bens.map(el => el.phone);
    setBeneficiaryPhone(beneficiariesPhone);
  }, []);

  const updateBeneficiaryData = async e => {
    const formData = new FormData(e.target.form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
      if (data[key] === '') data[key] = null;
    });
    const phoneNumber = beneficiaryPhone.includes(data.phone);
    if (phoneNumber) {
      Swal.fire({
        title: 'Phone number already exist!',
        text: 'Enter new phone number.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try another phone number',
      });
    }
    setBeneficiaryDetails(data);
  };

  const save = async e => {
    e.preventDefault();
    history.push(`/${aidConnectId}/beneficiary/photo`);
  };

  useEffect(() => {
    getBeneficiary();
  }, [getBeneficiary]);

  return (
    <>
      <AppHeader
        currentMenu="Register Beneficiary"
        actionButton={
          <Link to={`/${aidConnectId}`} className="headerButton">
            <IoHomeOutline className="ion-icon" />
          </Link>
        }
      />

      <div id="appCapsule">
        <div className="section mt-3">
          <Form onSubmit={save}>
            <Accordion defaultActiveKey="0" style={{ borderRadius: '10px' }}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" style={{ color: '#2b7ec1' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Required fields</span> <IoChevronDownOutline className="ion-icon" />
                  </div>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Full Name *</label>
                        <Form.Control
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={name || ''}
                          onChange={updateBeneficiaryData}
                          required
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Phone *</label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          name="phone"
                          placeholder="Enter mobile number"
                          value={phone || ''}
                          onChange={updateBeneficiaryData}
                          onKeyDown={e => {
                            if (['-', '+', 'e'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          required
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Permanent address *</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Enter permanent address"
                          value={address || ''}
                          onChange={updateBeneficiaryData}
                          required
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" style={{ color: '#2b7ec1' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Advance fields</span> <IoChevronDownOutline className="ion-icon" />
                  </div>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Temporary address</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="address_temporary"
                          placeholder="Enter temporary address"
                          value={address_temporary || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Age</label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          name="age"
                          placeholder="Enter age"
                          value={age || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label" htmlFor="gender">
                          Gender
                        </label>
                        <select
                          className="form-control custom-select"
                          name="gender"
                          onChange={updateBeneficiaryData}
                        >
                          <option value="U">Select gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Email Address</label>
                        <Form.Control
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Enter email"
                          value={email || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Citizenship Id</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="govt_id"
                          placeholder="Enter address"
                          value={govt_id || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Education</label>
                        <Form.Control
                          type="text"
                          name="education"
                          className="form-control"
                          placeholder="Enter education"
                          value={education || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Profession</label>
                        <Form.Control
                          type="text"
                          name="profession"
                          className="form-control"
                          placeholder="Enter profession"
                          value={profession || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Family members</label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          name="family_members"
                          placeholder="Enter number of family members"
                          value={family_members || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Adults</label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          name="adult"
                          placeholder="Enter number of adults"
                          value={adult || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>{' '}
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Child</label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          name="child"
                          placeholder="Enter number of children"
                          value={child || ''}
                          onChange={updateBeneficiaryData}
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <Button type="submit" className="btn btn-lg btn-block btn-success mt-3 mb-2">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddBeneficiary;
