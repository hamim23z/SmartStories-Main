"use client"
import { Box, Typography, Button, TextField, AppBar, Toolbar, IconButton, Drawer, List, ListItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';


export default function SmartHub() {

    /*For the Mobile View - Drawer */
    const [openNavDrawer, setOpenNavDrawer] = useState(false);
    const toggleNavDrawer = (open) => {
        setOpenNavDrawer(open);
    }

  return (
    <>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, #131313, #151c18, #17241c, #172d21, #173726, #16402a, #134a2f, #0e5434)",
          paddingTop: "5px",
          paddingBottom: "5px",
          position: "static",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => toggleNavDrawer(true)}
            >
              <MenuIcon sx={{ fontSize: "30px", marginTop: "15px" }} />
            </IconButton>
          </Box>

          <Box>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Kanit",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Smart Stories
              </Typography>
            </Link>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "2rem",
            }}
          >
            <Link
              href="#"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Kanit",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Documentation
              </Typography>
            </Link>

            <Link
              href="#"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Kanit",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                The Smart Hub
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="bottom"
        open={openNavDrawer}
        onClose={() => toggleNavDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        <List>
          <ListItem button onClick={() => toggleNavDrawer(false)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Kanit",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  paddingTop: "10px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Home Page
              </Typography>
            </Link>
          </ListItem>

          <ListItem button onClick={() => toggleNavDrawer(false)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href="#"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Kanit",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Documentation
              </Typography>
            </Link>
          </ListItem>

          <ListItem button onClick={() => toggleNavDrawer(false)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href="#"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Kanit",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                The Smart Hub
              </Typography>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}