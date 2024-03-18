"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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

      setState(null);
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