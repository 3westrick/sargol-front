import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';
import { TransitionProps } from '@mui/material/transitions';
import { useAtom, useAtomValue } from 'jotai';
import { admin_snackbar } from '@/Atoms';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}


export default function AdminSnackBar() {
  const [state, setState] = useAtom(admin_snackbar)

  const handleClose = () => {
    setState({
        state: false,
        message: ""
    })
  };

  return (
      <Snackbar
        open={state.state}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={state.message}
        key={SlideTransition.name}
        autoHideDuration={2000}
        color='white'
      />
  );
}