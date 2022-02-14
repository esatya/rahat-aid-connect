import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  IoChevronForwardOutline,
  IoSyncOutline,
  IoRadioButtonOff,
  IoChevronBackOutline,
  IoHomeOutline,
} from 'react-icons/io5';
import { BiReset } from 'react-icons/bi';
import Webcam from 'react-webcam';
import AppHeader from '../layouts/AppHeader';
import { AppContext } from '../../contexts/AppContext';
import { RegisterBeneficiaryContext } from '../../contexts/registerBeneficiaryContext';

export default function Main() {
  const history = useHistory();
  const { aidConnectId } = useContext(AppContext);
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: 'user',
    forceScreenshotSourceSize: true,
    screenshotQuality: 1,
    minScreenshotWidth: 1024,
  });
  const [previewImage, setPreviewImage] = useState('');
  const { setBeneficiaryPhoto } = useContext(RegisterBeneficiaryContext);

  const webcamRef = React.useRef(null);
  const camContainerRef = React.useRef();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreviewImage(imageSrc);
  };
  const handleFaceChange = () => {
    const { facingMode } = videoConstraints;
    const face = facingMode === 'environment' ? 'user' : 'environment';
    setVideoConstraints({ ...videoConstraints, facingMode: face });
  };

  const save = async event => {
    event.preventDefault();
    setBeneficiaryPhoto(previewImage);
    history.push(`/${aidConnectId}/beneficiary/idcard`);
  };

  const skip = async event => {
    event.preventDefault();
    history.push(`/${aidConnectId}/beneficiary/idcard`);
  };

  useEffect(() => {
    setVideoConstraints({
      facingMode: 'user',
      forceScreenshotSourceSize: true,
      screenshotQuality: 1,
      minScreenshotWidth: 1024,
    });
    return function cleanup() {};
  }, []);

  return (
    <>
      <AppHeader
        currentMenu="Register Beneficiary"
        backButton={
          <Link to={`/${aidConnectId}/add`} className="headerButton goBack">
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
        <div className="section">
          <div className="card1" ref={camContainerRef}>
            <h2 className="mt-4">Take a photo of beneficiary</h2>
            <span>Remember to smile :-)</span>
            <div className="mt-5 text-center">
              {previewImage ? (
                <img className="video-flipped idCardSnapper" alt="preview" src={previewImage} />
              ) : (
                <div className="selfieWrapper">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    className="idCardSnapper"
                    minScreenshotWidth={1024}
                    minScreenshotHeight={720}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
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
                className="btn btn-lg btn-block btn-success mt-3 mb-5"
                onClick={save}
              >
                Continue to next step
              </button>
            </div>
          ) : (
            <div className="mt-5 mb-3 d-flex justify-content-between align-items-center">
              <div className="btn-faceChange" onClick={handleFaceChange}>
                <IoSyncOutline className="btn-flipcamera" />
              </div>
              <div className="btn-shutter" onClick={capture}>
                <IoRadioButtonOff className="btn-shutter-icon" />
              </div>
              <div className="btn-faceChange" onClick={skip}>
                <IoChevronForwardOutline className="btn-skip" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
