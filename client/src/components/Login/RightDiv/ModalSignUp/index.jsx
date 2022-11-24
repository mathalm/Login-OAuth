import * as React from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from "@mui/material";
import { useState } from 'react';
import { saveInfos as saveInfosEndpoint, verifyEmailAlreadyExists } from '../../../../utils/endpoints';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalSignUp({ handleClose, open }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputPropsEmail, setInputPropsEmail] = useState({ error: false });
  const [inputPropsUserName, setInputPropsUserName] = useState({ error: false });
  const [inputPropsConfirmPassword, setInputPropsConfirmPassword] = useState({ error: false });
  const [inputPropsPassword, setInputPropsPassword] = useState({ error: false });

  const handleSetInfos = (e, type) => {
    switch (type) {
      case 'userName':
        setUserName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleShowInfos = async () => {
    handleUsernameIsCorrect();
    handleVerifyCorrectEmail();
    handleVerifyPassword();
    handleVerifyConfirmPassword();
    if(await handleCanSaveInfos()){
      handleSaveInfos();
    }
  }

  const handleCanSaveInfos = async () => {
    if (inputPropsUserName.error || inputPropsEmail.error || inputPropsConfirmPassword.error || inputPropsPassword.error || userName.length < 2 || password.length < 2){
      return false
    }
    else{
      return true
    }
  }

  const handleVerifyIfShowError = (property, setInputProps, message) => {
    if (property.length > 1) {
      setInputProps({ error: false })
    } else {
      setInputProps({ error: true, helperText: message })
    }
  }

  const handleUsernameIsCorrect = () => {
   handleVerifyIfShowError(userName, setInputPropsUserName, "Username can't be empty")
  }

  const handleVerifyCorrectEmail = async () => {
    const emailAlreadyExists = await verifyEmailAlreadyExists(email);
    if (emailAlreadyExists.message !== "Email doesn't exists!") {
      setInputPropsEmail({ error: true, helperText: 'E-mail already exists' })
      return
    }
    if (email.includes('@') && !email.includes(' ')) {
      setInputPropsEmail({ error: false })
    } else {
      setInputPropsEmail({ error: true, helperText: 'Incorret e-mail' })
      return
    }
  }
  const handleVerifyPassword = () => {
    handleVerifyIfShowError(password, setInputPropsPassword, "Password can't be empty")
  }


  const handleVerifyConfirmPassword = () => {
    if (confirmPassword === password && confirmPassword.length > 3) {
      setInputPropsConfirmPassword({ error: false })
    } else {
      setInputPropsConfirmPassword({ error: true, helperText: 'Incorret password' })
    }
  }
  const handleSaveInfos = async () =>{
    saveInfosEndpoint({
      userName,
      email,
      password
    })
    
   window.location = 'http://localhost:3000/InitialPage'
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Welcome to my login page"}</DialogTitle>
        <DialogContent className='div-modal-sign-up'>
          <div>
            <TextField id="standard-basic1"
              label="Username"
              variant="standard"
              fullWidth
              {...inputPropsUserName}
              onBlur={handleUsernameIsCorrect}
              className='textfield'
              onChange={(e) => handleSetInfos(e, 'userName')} />
          </div>

          <div>
            <TextField id="standard-basic2"
              label="E-mail"
              variant="standard"
              fullWidth
              {...inputPropsEmail}
              className='textfield'
              onBlur={handleVerifyCorrectEmail}
              onChange={(e) => handleSetInfos(e, 'email')} />
          </div>

          <div>
            <TextField id="standard-basic3"
              label="Password"
              variant="standard"
              type='password'
              fullWidth
              {...inputPropsPassword}
              className='textfield'
              onBlur={handleVerifyPassword}
              onChange={(e) => handleSetInfos(e, 'password')} />
          </div>

          <div>
            <TextField id="standard-basic4"
              label="Confirm password"
              variant="standard"
              type='password'
              fullWidth
              {...inputPropsConfirmPassword}
              className='textfield'
              onBlur={handleVerifyConfirmPassword}
              onChange={(e) => handleSetInfos(e, 'confirmPassword')} />
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" >Cancel</Button>
          <Button onClick={handleShowInfos}  variant="contained">Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
