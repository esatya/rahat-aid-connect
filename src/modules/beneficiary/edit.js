import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Form, Button, Accordion, Card } from 'react-bootstrap';
import { IoCloseCircle, IoHomeOutline, IoChevronDownOutline } from 'react-icons/io5';
import { useHistory, Link } from 'react-router-dom';
import AppHeader from '../layouts/AppHeader';
import { AppContext } from '../../contexts/AppContext';
import DataService from '../../services/db';

const AddBeneficiary = props => {
  const benId = props.match.params.phone;
  const history = useHistory();
  const { aidConnectId } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    govt_id: '',
  });
  const getBeneficiaryData = useCallback(async () => {
    const data = await DataService.getBeneficiary(benId);
    const { name, phone, email, address, gender, govt_id } = data;
    setFormData({ name, phone, email, address, gender, govt_id });
  }, [benId]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const save = async e => {
    e.preventDefault();
    const {phone,...rest} = formData;
    DataService.updateBeneficiary(phone,rest)
    history.push(`/${aidConnectId}/list`);
  };

  useEffect(() => {
    getBeneficiaryData();
  }, [getBeneficiaryData]);

  return (
    <>
      <AppHeader
        currentMenu="Edit Beneficiary"
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
                        <label className="label">Phone (cannot be edited)</label>
                        <Form.Control
                          type="number"
                          className="form-control"
                          name="phone"
                          placeholder="Enter mobile number"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          onKeyDown={e => {
                            if (['-', '+', 'e'].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          disabled
                        />
                        <i className="clear-input">
                          <IoCloseCircle className="ion-icon" />
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">Full Name *</label>
                        <Form.Control
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={formData.name || ''}
                          onChange={handleInputChange}
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
                          value={formData.address || ''}
                          onChange={handleInputChange}
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
                          value={formData.address_temporary || ''}
                          onChange={handleInputChange}
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
                          value={formData.age || ''}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                          value={formData.email || ''}
                          onChange={handleInputChange}
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
                          value={formData.govt_id || ''}
                          onChange={handleInputChange}
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
                          value={formData.education || ''}
                          onChange={handleInputChange}
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
                          value={formData.profession || ''}
                          onChange={handleInputChange}
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
                          value={formData.family_members || ''}
                          onChange={handleInputChange}
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
                          value={formData.adult || ''}
                          onChange={handleInputChange}
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
                          value={formData.child || ''}
                          onChange={handleInputChange}
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
