import React from 'react';
import './styles.css';
import { Button } from '@mui/material';
import InputsSignIn from './InputsSignIn';
import { useState } from 'react';
import { verifyInfoToSignIn } from '../../../utils/endpoints';
import ModalAskNewPassword from './ModalAskNewPassword';
import InfoPopUp from '../../InfoPopUp/index.jsx';

function LeftDiv() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputpropsEmail, setInputpropsEmail] = useState({ error: false });
  const [openModalAskNewPassword, setOpenModalAskNewPassword] = useState(false)
  const [inputpropsPassword, setInputpropsPassword] = useState({ error: false });
  const [openInfoPopUp, setOpenInfoPopUp] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');

  const handleSetInputProps = (bolean, error) => {
    setInputpropsEmail({ error: bolean })
    setInputpropsPassword({ error: bolean, helperText: error })

  }

  const handleVerifyInfosToSignIn = async () => {

    if (!email || !password) {
      handleSetInputProps(true, "Fields cannot be empty.")
      return
    }

    const response = await verifyInfoToSignIn(email, password);
    if (response.error) {
      handleSetInputProps(true, response.error);
    } else {
      handleSetInputProps(false)
      window.location = '/InitialPage'
    }
  }
  const handlePressKeyEnter = (e) => {
    if (e.key === 'Enter') {
      handleVerifyInfosToSignIn();
    }
  }


  const handleCloseModalAskNewPassword = () => {
    setOpenModalAskNewPassword(false)
  }
  const handleOpenModalAskNewPassword = () => {
    setOpenModalAskNewPassword(true)
  }

  return (
    <div className='div-left' onKeyDown={handlePressKeyEnter}>
      <div className='div-title'>
        <h1>Welcome back!</h1>
      </div>
      <div className='div-input-data'>
        <InputsSignIn setEmail={setEmail} setPassword={setPassword} inputpropsEmail={inputpropsEmail} inputpropsPassword={inputpropsPassword} />
        <div className='div-buttons'>
          <div className='div-forget-email'>
            <h6 onClick={handleOpenModalAskNewPassword}>Did you forget your password?</h6>
          </div>
          <div className='div-button-sign-in'>
            <Button variant="contained" onClick={handleVerifyInfosToSignIn}>Sign In</Button>
          </div>
        </div>
      </div>
      <InfoPopUp className='InfoPopUp' openInfoPopUp={openInfoPopUp} setOpenInfoPopUp={setOpenInfoPopUp} messagePopUp={messagePopUp} plataform={'google'} />
      <ModalAskNewPassword
        handleCloseModalAskNewPassword={handleCloseModalAskNewPassword}
        openModalAskNewPassword={openModalAskNewPassword}
        setOpenInfoPopUp={setOpenInfoPopUp}
        setMessagePopUp={setMessagePopUp}
      />

    </div>
  );
}

export default LeftDiv;