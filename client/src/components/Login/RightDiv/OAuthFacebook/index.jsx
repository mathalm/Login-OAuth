import React, { useState } from 'react';
import './styles.css';
import facebook from '../../../../images/facebook.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { verifyEmailAlreadyExists } from '../../../../utils/endpoints';
import InfoPopUp from '../../../InfoPopUp';
import ModalPasswordOAuth from '../ModalPasswordOAuth';


function OAuthFacebook() {

  const [messagePopUp, setMessagePopUp] = useState('');
  const [openInfoPopUp, setOpenInfoPopUp] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [facebookUserInfo, setFacebookUserInfo] = useState('');

  const handleOpenModalSignUp = () => {
    setOpenModalPassword(true);
  };

  const handleClose = () => {
    setOpenModalPassword(false);
  };

  const responseFacebook = async (response) => {

    const responseEmailExists = await verifyEmailAlreadyExists(response.email)
    if (responseEmailExists.message === "Email doesn't exists!") {

      setAccessToken(response.accessToken)
      setFacebookUserInfo({
        userName: response.name,
        email: response.email
      })
      handleOpenModalSignUp()
    }else{
      let textFieldLeftDiv = document.getElementById('standard-basic12')
      setMessagePopUp('You already have an account with us!')
      setOpenInfoPopUp(true);
      textFieldLeftDiv.focus();
      return
    }
  }

  return (
    <div>

      <FacebookLogin
        appId="725413742173809"
        autoLoad={false}
        callback={responseFacebook}
        fields="name,email"
        render={renderProps => (
          <div className='div-sign' onClick={renderProps.onClick}>
            <div><img src={facebook} alt="img google" /><span> Continue with Google</span></div>
          </div>
        )}
      />
      <InfoPopUp openInfoPopUp={openInfoPopUp} setOpenInfoPopUp={setOpenInfoPopUp} messagePopUp={messagePopUp} />
      <ModalPasswordOAuth handleClose={handleClose} open={openModalPassword} accessToken={accessToken} userInfos={facebookUserInfo} plataform={'google'} />
    </div>
  );
}

export default OAuthFacebook;