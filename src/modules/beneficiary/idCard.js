import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  IoChevronForwardOutline,
  IoRadioButtonOff,
  IoChevronBackOutline,
  IoHomeOutline,
} from 'react-icons/io5';

import { BiReset } from 'react-icons/bi';
import Webcam from 'react-webcam';
import AppHeader from '../layouts/AppHeader';
import { RegisterBeneficiaryContext } from '../../contexts/registerBeneficiaryContext';
import { AppContext } from '../../contexts/AppContext';

export default function Main() {
  const history = useHistory();
  const { aidConnectId } = useContext(AppContext);
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: 'environment',
    forceScreenshotSourceSize: true,
    screenshotQuality: 1,
    width: 1280,
    height: 720,
  });
  const [previewImage, setPreviewImage] = useState('');
  const [showPageLoader, setShowPageLoader] = useState(true);
  const webcamRef = React.useRef(null);
  const { setBeneficiaryIdImage } = useContext(RegisterBeneficiaryContext);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreviewImage(imageSrc);
  };

  const save = async event => {
    event.preventDefault();
    history.push(`/${aidConnectId}/beneficiary/preview`);
    setBeneficiaryIdImage(previewImage);
  };

  const skip = async event => {
    event.preventDefault();
    // await registerBeneficiary();
    history.push(`/${aidConnectId}/beneficiary/preview`);
  };

  useEffect(() => {
    setVideoConstraints({
      facingMode: 'environment',
      forceScreenshotSourceSize: true,
      screenshotQuality: 1,
      width: 1280,
      height: 720,
    });
    return function cleanup() {};
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPageLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AppHeader
        currentMenu="Register Beneficiary"
        backButton={
          <Link to={`/${aidConnectId}/beneficiary/photo`} className="headerButton goBack">
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
        {showPageLoader ? (
          <div id="loader">
            <img src="/assets/img/brand/icon-white-128.png" alt="icon" className="loading-icon" />
          </div>
        ) : (
          <>
            {/* <Loading message={loading} showModal={loading !== null} /> */}
            <div className="section">
              <div className="card1">
                <h3 className="mt-4">Take a picture of beneficiary ID card</h3>
                <span>Citizenship, Passport, License or National ID</span>
                <br />
                <div className="mt-5">
                  {previewImage ? (
                    <img
                      alt="preview"
                      src={previewImage}
                      style={{
                        borderRadius: '10px',
                        width: '100%',
                        height: '350px',
                        border: '3px solid #958d9e',
                      }}
                    />
                  ) : (
                    <div className="idCardWrapper mt-4">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        height={720}
                        width={1280}
                        minScreenshotWidth={1024}
                        minScreenshotHeight={720}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                        className="idCardSnapper"
                      />
                    </div>
                  )}
                </div>
              </div>
              {previewImage ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-outline-primary mt-5"
                    onClick={() => setPreviewImage(null)}
                  >
                    <BiReset className="ion-icon" />
                    Retake Picture
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-success mt-3 mb-2"
                    onClick={save}
                  >
                    Complete setup
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
                  <div style={{ width: '40px', height: '40px' }} />

                  <div className="btn-shutter" onClick={capture}>
                    <IoRadioButtonOff className="btn-shutter-icon" />
                  </div>
                  <div className="btn-faceChange" onClick={skip}>
                    <IoChevronForwardOutline className="btn-skip" />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
