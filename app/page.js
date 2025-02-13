"use client";
import {
  Box,
  Typography,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  MenuItem,
  Container,
  Stack,
  Snackbar
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const stay_private = [ //this is for the stay private values from dropdown
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

export default function HomePage() {
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const toggleNavDrawer = (open) => {
    setOpenNavDrawer(open);
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [stayPrivate, setStayPrivate] = useState("No");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/submitStory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, location, story, stayPrivate })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Story submitted successfully!");
      // Clear form
      setName("");
      setAge("");
      setLocation("");
      setStory("");
      setStayPrivate("No");
    } else {
      alert("Error submitting story: " + data.error);
    }
  };

  {/*NewsLetter*/ }
  const [snackbarOpenNews, setSnackbarOpenNews] = useState(false);
  const [emailNews, setEmailNews] = useState("");
  const [emailErrorNews, setEmailErrorNews] = useState("");
  const emailRegexNews = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSnackbarCloseNews = () => {
    setSnackbarOpenNews(false);
  };

  const handleEmailChangeNews = (e) => {
    const value = e.target.value;
    setEmailNews(value);

    if (!emailRegexNews.test(value)) {
      setEmailErrorNews("Enter a valid email address.");
    } else {
      setEmailErrorNews("");
    }
  };

  const handleSendMessageNews = async () => {
    setEmailErrorNews("");

    if (!emailNews.trim()) {
      setSnackbarOpenNews(true);
      setEmailErrorNews("Email cannot be empty.");
      return;
    }

    if (!emailRegexNews.test(emailNews)) {
      setSnackbarOpenNews(true);
      setEmailErrorNews("Enter a valid email address.");
      return;
    }

    try {
      await addDoc(collection(db, "Newsletter"), {
        email: emailNews,
        timestamp: new Date(),
      });

      setSnackbarOpenNews(true);
      setEmailErrorNews("");

      setEmailNews("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

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
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Smart Stories
              </Typography>
            </Link>
          </Box>

          {/* Desktop links */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "2rem",
            }}
          >
            <Link
              href="https://smarttranslate.mintlify.app/introduction"
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
              href="/smart-hub"
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
                Smart Hub
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
          <ListItem
            button
            onClick={() => toggleNavDrawer(false)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
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
                  alignItems: "center",
                }}
              >
                Home Page
              </Typography>
            </Link>
          </ListItem>

          <ListItem
            button
            onClick={() => toggleNavDrawer(false)}
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

          <ListItem
            button
            onClick={() => toggleNavDrawer(false)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href="/smart-hub"
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

      {/*Main Stuff Goes Under Here*/}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          textAlign: "center",
          background:
            "linear-gradient(90deg, #131313, #151c18, #17241c, #172d21, #173726, #16402a, #134a2f, #0e5434)",
          paddingTop: "50px",
          paddingBottom: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            variant="filled"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              fontFamily: "Kanit",
              fontFamily: "Kanit",
              "& .MuiInputBase-root": { fontFamily: "Kanit", fontWeight: 500 },
              "& .MuiInputLabel-root": { fontFamily: "Kanit", fontWeight: 500, color: "green" },
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "&:hover .MuiFilledInput-underline:before": { borderBottom: "none" }
            }}
          />

          <TextField
            label="Age"
            variant="filled"
            required
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              fontFamily: "Kanit",
              "& .MuiInputBase-root": { fontFamily: "Kanit", fontWeight: 500 },
              "& .MuiInputLabel-root": { fontFamily: "Kanit", fontWeight: 500, color: "green" },
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "&:hover .MuiFilledInput-underline:before": { borderBottom: "none" }
            }}
          />

          <TextField
            label="Location"
            variant="filled"
            required
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              fontFamily: "Kanit",
              "& .MuiInputBase-root": { fontFamily: "Kanit", fontWeight: 500 },
              "& .MuiInputLabel-root": { fontFamily: "Kanit", fontWeight: 500, color: "green" },
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "&:hover .MuiFilledInput-underline:before": { borderBottom: "none" }
            }}
          />

          <TextField
            variant="filled"
            select
            label="Stay Private?"
            required
            value={stayPrivate}
            onChange={(e) => setStayPrivate(e.target.value)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "200px",
              fontFamily: "Kanit",
              "& .MuiInputBase-root": { fontFamily: "Kanit", fontWeight: 500 },
              "& .MuiInputLabel-root": { fontFamily: "Kanit", fontWeight: 500, color: "green" },
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "&:hover .MuiFilledInput-underline:before": { borderBottom: "none" }
            }}
          >
            {stay_private.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ paddingTop: "50px" }}>
          <TextField
            label="Story"
            variant="filled"
            required
            multiline
            rows={15}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "900px",
              fontFamily: "Kanit",
              "& .MuiInputBase-root": { fontFamily: "Kanit", fontWeight: 500 },
              "& .MuiInputLabel-root": { fontFamily: "Kanit", fontWeight: 500, color: "green" },
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "&:hover .MuiFilledInput-underline:before": { borderBottom: "none" }
            }}
          />

          <Box sx={{
            paddingTop: "50px"
          }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                background: "rgb(62, 116, 216)",
                transition: "background 0.4s ease-in-out",
                "&:hover": {
                  background: "rgb(35, 88, 187)",
                },
              }}
            >Submit Story</Button>
          </Box>
        </Box>
      </Box>

      {/*FOOTER*/}
      <Box
        component="footer"
        sx={{
          height: "auto",
          py: 4,
          background:
            "linear-gradient(90deg, #131313, #151c18, #17241c, #172d21, #173726, #16402a, #134a2f, #0e5434)",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            justifyContent="space-between"
          >
            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontFamily: "Kanit",
                  fontWeight: "900",
                  textTransform: "uppercase",
                }}
              >
                Smart Translate
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "white", fontFamily: "Kanit" }}
              >
                Subscribe to our newsletter for updates!
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={handleEmailChangeNews}
                  placeholder="Your email"
                  value={emailNews}
                  sx={{
                    flexGrow: 1,
                    background: "white",
                    borderRadius: "10px",
                    "& .MuiInputBase-input::placeholder": {
                      color: "black",
                      fontFamily: "Kanit",
                      fontWeight: "700",
                    },
                    "& .MuiInputBase-input": {
                      color: "black",
                      fontFamily: "Kanit",
                      fontWeight: "500",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    background: "rgb(62, 116, 216)",
                    transition: "background 0.4s ease-in-out",
                    "&:hover": {
                      background: "rgb(35, 88, 187)",
                    },
                  }}
                  onClick={handleSendMessageNews}
                >
                  Submit
                </Button>

                <Snackbar
                  open={snackbarOpenNews}
                  autoHideDuration={6000}
                  onClose={handleSnackbarCloseNews}
                  message={
                    emailErrorNews ||
                    "You have successfully signed up for our newsletter."
                  }
                />
              </Stack>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              {/* Company Section */}
              <Stack spacing={1}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontFamily: "Kanit",
                    fontWeight: "900",
                  }}
                >
                  Company
                </Typography>
                <Link
                  href="/about-us"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Kanit",
                    fontWeight: "400",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  About Us
                </Link>

                <Link
                  href="https://smarttranslate.mintlify.app/introduction"
                  target="_blank"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Kanit",
                    fontWeight: "400",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Privacy
                </Link>
              </Stack>

              {/* Support Section */}
              <Stack spacing={1}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontFamily: "Kanit",
                    fontWeight: "900",
                  }}
                >
                  Support
                </Typography>
                <Link
                  href="/contact"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Kanit",
                    fontWeight: "400",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Contact Us
                </Link>
                <Link
                  href="/resources"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Kanit",
                    fontWeight: "400",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Resources
                </Link>
              </Stack>

              {/* Smart Hub Section */}
              <Stack spacing={1}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontFamily: "Kanit",
                    fontWeight: "900",
                  }}
                >
                  Smart Hub
                </Typography>
                <Link
                  href="https://smartstudycs.vercel.app/"
                  target="_blank"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Kanit",
                    fontWeight: "400",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Smart Study
                </Link>
                <Link
                  href="#"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Kanit",
                    fontWeight: "400",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Smart Stories
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}