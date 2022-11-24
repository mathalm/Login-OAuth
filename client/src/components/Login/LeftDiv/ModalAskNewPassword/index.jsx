import React from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from "@mui/material";
import { useState } from 'react';
import {sendEmailToNewPassword, verifyEmailAlreadyExists } from '../../../../utils/endpoints';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function ModalAskNewPassword({openModalAskNewPassword,handleCloseModalAskNewPassword, setMessagePopUp, setOpenInfoPopUp}) {
  const [email, setEmail] = useState('');
  const [inputPropsEmail, setInputPropsEmail] = useState({ error: false});

  
  const handleAksNewPassword = async () => {
    const responseRequest = await verifyEmailAlreadyExists(email);
    
    if (responseRequest.message === "Email doesn't exists!") {
      setInputPropsEmail({ error: true, helperText: responseRequest.message });
      return
    }

    if (email.includes('@') && !email.includes(' ')) {
      const responseRequestNewPassword = await sendEmailToNewPassword(email);
      setInputPropsEmail({ error: false, helperText: responseRequestNewPassword.message });
      setMessagePopUp('New password sent to your e-mail');
      setOpenInfoPopUp(true);
      handleCloseModalAskNewPassword();

    } else {
      setInputPropsEmail({ error: true, helperText: responseRequest.message });
    }
  }
 
  return (
    <Dialog
      open={openModalAskNewPassword}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModalAskNewPassword}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Ask a new password"}</DialogTitle>
      <DialogContent >
        <div className="div-text-request-password">
          <p>The new password will be create and send to e-mail written in this entry.</p>
        </div>
        <div>
        <TextField id="standard-basic20"
              label="E-mail"
              variant="standard"
              fullWidth
              {...inputPropsEmail}
              className='textfield'
              onChange={(e) => setEmail(e.target.value)} />
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModalAskNewPassword} color="error">Cancel</Button>
        <Button onClick={handleAksNewPassword} variant="contained">Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAskNewPassword;