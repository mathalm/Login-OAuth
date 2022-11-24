import React from 'react';
import './styles.css'
import ModalSignUp from './ModalSignUp';
import OAuthGoogle from './OauthGoogle';
import OAuthFacebook from './OAuthFacebook';

function RightDiv() {
  const [open, setOpen] = React.useState(false);

  const handleOpenModalSignUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalSignUp handleClose={handleClose} open={open} />
      <div className='div-right'>
        <div className='div-title div-title-sign'>
          <h1>Don't have an account yet?</h1>
        </div>
        <div className='sign'>
          <div className='div-sign create-account' onClick={handleOpenModalSignUp}>
            <div><span>Sign up!</span></div>
          </div>
          <OAuthGoogle />
          <OAuthFacebook />
        </div>
      </div>
    </>
  );
}

export default RightDiv;