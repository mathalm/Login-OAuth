import React from 'react';

import { TextField } from '@mui/material';


function InputsSignIn({setEmail,setPassword, inputpropsPassword,inputpropsEmail}) {
 
  return (
    <div className='div-inputs-sign-in'>
      <div className='div-input-login'>
        <TextField id="standard-basic12" 
        label="User or e-mail" 
        variant="standard" 
        onChange={(e) => setEmail(e.target.value)}
        {...inputpropsEmail}
        fullWidth 
        />
      </div>
      <div className='div-input-login'>
        <TextField id="standard-basic" 
        label="Password" 
        variant="standard" 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        {...inputpropsPassword}
        fullWidth 
        />
      </div>
    </div>
  );
}

export default InputsSignIn;