import React, { useState } from 'react';
import google from '../../../../images/google.png';
import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleInfo, verifyEmailAlreadyExists } from '../../../../utils/endpoints';
import ModalPasswordOAuth from '../ModalPasswordOAuth';
import InfoPopUp from '../../../InfoPopUp';


function OAuthGoogle() {
  const [accessToken, setAccessToken] = useState('');
  const [open, setOpen] = useState(false);
  const [openInfoPopUp, setOpenInfoPopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');
  const [googleUserInfos, setGoogleUserInfos] = useState({});

  const handleOpenModalSignUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMakeOAuth = useGoogleLogin({
    onSuccess: tokenResponseOAuth => {
      handleMakeValidations(tokenResponseOAuth);
    },
  }
  );

  const handleMakeValidations = async (tokenResponseOAuth) => {
    setAccessToken(tokenResponseOAuth.access_token);
    const data = await getGoogleInfo(tokenResponseOAuth.access_token)
    setGoogleUserInfos(data)
    const responseEmailExists = await verifyEmailAlreadyExists(data.email)
    if (responseEmailExists.message === "Email doesn't exists!") {
      handleOpenModalSignUp();
      return
    } else {

      let textFieldLeftDiv = document.getElementById('standard-basic12')
      setMessagePopUp('You already have an account with us!')
      setOpenInfoPopUp(true);
      textFieldLeftDiv.focus();
    }
  }
  return (
    <div>
      <div className='div-sign' onClick={handleMakeOAuth}>
        <div><img src={google} alt="img google" /><span> Continue with Google</span></div>
      </div>
      <ModalPasswordOAuth handleClose={handleClose} open={open} accessToken={accessToken} userInfos={googleUserInfos} />
      <InfoPopUp className='InfoPopUp' openInfoPopUp={openInfoPopUp} setOpenInfoPopUp={setOpenInfoPopUp} messagePopUp={messagePopUp} plataform={'google'} />
    </div>
  );
}

export default OAuthGoogle;