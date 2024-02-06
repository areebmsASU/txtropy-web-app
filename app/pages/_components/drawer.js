"use client";

import {useState} from 'react';

import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Global } from '@emotion/react';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';



const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));
  
const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const drawerBleeding = 56;


export default function Drawer({ params }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

    return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible'
          },
        }}
      />
    <TabContext value={value} >

    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      slotProps={{
        backdrop: {
          invisible: true
        }
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <StyledBox
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
          pointerEvents: 'all'
        }}
        onClick={toggleDrawer(true)}
      >
        <Puller />
        <Typography sx={{ p: 2, color: 'text.secondary' }}>
        <TabList onChange={(e,v) => {setValue(v)}} aria-label="lab API tabs example">
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </TabList>
        </Typography>
      </StyledBox>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
    </SwipeableDrawer>
    </TabContext>
    </>
    )
  }


