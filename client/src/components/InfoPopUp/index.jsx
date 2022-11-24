import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { AiOutlineClose } from "react-icons/ai";

export default function InfoPopUp({openInfoPopUp, setOpenInfoPopUp,messagePopUp}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenInfoPopUp(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <AiOutlineClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openInfoPopUp}
        autoHideDuration={6000}
        onClose={handleClose}
        message={messagePopUp}
        action={action}
      />
    </div>
  );
}
