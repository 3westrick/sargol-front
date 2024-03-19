"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function TemporaryDrawer({children, state, setState}: {
  children : React.ReactNode,
  state: boolean,
  setState: any
}) {
  

  // console.log(attribute)

  const closeDrawer =
    () =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(false);
    };



  return (
    <div>
        <React.Fragment>
          {/* <Button onClick={toggleDrawer(true)}>{'right'}</Button> */}
          <Drawer
            anchor={'right'}
            open={state}
            onClose={closeDrawer()}
            sx={{
              zIndex: 1300,
                '& .MuiDrawer-paper':{
                  borderBottomLeftRadius: 24,
                  borderTopLeftRadius: 24
                }
            }}
          >
           <Box
              role="presentation"
            >
              {children}
            </Box>
          </Drawer>
        </React.Fragment>
    </div>
  );
}