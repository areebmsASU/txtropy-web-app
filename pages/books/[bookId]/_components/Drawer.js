"use client";

import {useState, useEffect} from 'react';

import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/Drawer';
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


export default function Drawer({ chunkIds }) {

  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");

  const [relations, setRelations] = useState([]);
 
  useEffect(() => {
    chunkIds.length && fetch(`https://api.txtropy.com/relations/shared_vocab_ratio?chunks=${chunkIds.join()}&limit=100`).then(res => res.json()).then(newRelations=>{
    setRelations([...new Map(newRelations.map(item =>
      [item.chunk, item])).values()]);
    newRelations.length && setSelectedTab(newRelations[0].chunk);
    });    
  }, [chunkIds])


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
        }}/>
      
    <TabContext value={selectedTab} >
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
        }}>
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
          onClick={toggleDrawer(true)}>
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>
            <TabList onChange={(e,v) => {setSelectedTab(v)}}>
              {relations.map(relation => <Tab label={relation.value} value={relation.chunk} />) }
            </TabList>
          </Typography>
        </StyledBox>
            {relations.map(relation => <TabPanel value={relation.chunk}>{`${relation.chunk} ${relation.related.text} ${ JSON.stringify(relation.shared, null, 2) } ${ JSON.stringify(relation.entr, null, 2) }`}</TabPanel>) }
      </SwipeableDrawer>
    </TabContext>
    </>
    )
  }