"use client";

import { useState, useEffect } from "react";

import { Global } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { SwipeableDrawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const drawerBleeding = 56;

export default function Drawer({ chunkIds }) {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [relations, setRelations] = useState([]);

  useEffect(() => {
    const timeout =
      chunkIds.length > 0 &&
      setTimeout(() => {
        fetch(`https://api.txtropy.com/relations?chunks=${chunkIds}`)
          .then((res) => res.json())
          .then((newRelations) => {
            setRelations(newRelations);
            newRelations.length && setSelectedTab(newRelations[0].id);
            toggleDrawer(false);
          });
      }, 1000);
    !chunkIds.length && setRelations([]);

    return () => timeout && clearTimeout(timeout);
  }, [chunkIds]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <TabContext value={`${selectedTab}`}>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          slotProps={{
            backdrop: {
              invisible: true,
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
              pointerEvents: "all",
            }}
            onClick={toggleDrawer(true)}
          >
            <Puller />
            <Typography component="div" sx={{ p: 2, color: "text.secondary" }}>
              <TabList onChange={(e, v) => setSelectedTab(v)}>
                {relations.map((relation) => (
                  <Tab
                    key={relation.id}
                    value={`${relation.id}`}
                    label={`${relation.entropy.jensen_shannon} ${relation.book.author}`}
                  />
                ))}
              </TabList>
            </Typography>
          </StyledBox>
          {relations.map((relation) => (
            <TabPanel
              key={relation.id}
              value={`${relation.id}`}
              variant="scrollable"
            >
              <div>
                <p style={{ textAlign: "center", margin: "20px" }}>
                  <span style={{ fontSize: "1.2rem" }}>
                    <b>{relation.book.title}</b>
                  </span>

                  <span style={{ fontSize: "1.1rem" }}>
                    {` — ${relation.book.author}`}
                  </span>
                </p>

                <p style={{ fontSize: "1rem" }}>{relation.text}</p>
                <hr style={{ margin: "1rem" }} />
                <div style={{ textAlign: "center" }}>
                  <span style={{ width: "30%", display: "inline-block" }}>
                    <b>Standardized Distance: </b>
                    {relation.entropy.jensen_shannon}
                  </span>
                  <span style={{ width: "30%", display: "inline-block" }}>
                    <b> New Information: </b>
                    {relation.entropy.gained}
                  </span>
                  <span style={{ width: "30%", display: "inline-block" }}>
                    <b> Missing Information: </b>
                    {relation.entropy.lost}
                  </span>
                </div>
                <p style={{ textAlign: "center", fontSize: "1rem" }}>
                  <span style={{ display: "inline-block" }}>
                    <b>Matching Stems:</b>
                  </span>
                  {relation.shared_vocab.map((v) => (
                    <span key={v.stem} style={{ display: "inline-block" }}>
                      {v.stem}: {v.count}{" "}
                    </span>
                  ))}
                </p>
              </div>
            </TabPanel>
          ))}
        </SwipeableDrawer>
      </TabContext>
    </>
  );
}
