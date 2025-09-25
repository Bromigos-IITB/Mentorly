import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/FindingMentorAnimationV2.json";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import NavBarProfileMentee from "../components/NavBarProfileMentee.jsx";

// Data for your new mentors (without images)
const mentors = [
  {
    id: 1,
    name: "Dr. Kapil Kadam",
    title: "Web Developer",
  },
  {
    id: 2,
    name: "Dr. Siddheshwar Patil",
    title: "AIML Expert",
  },
  {
    id: 3,
    name: "Dr. Keerti Mahajan",
    title: "Data Scientist",
  },
];

const FindMentorPage = () => {
  const [loading, setLoading] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleContactClick = () => {
    setContactDialogOpen(true);
  };

  const handleDialogClose = () => {
    setContactDialogOpen(false);
    navigate("/home");
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "#fff8f0",
      },
      primary: {
        main: "#ff6b35",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBarProfileMentee />
      <Container
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
          marginBottom: "50px",
        }}
      >
        {loading ? (
          <Box
            height="50vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              gutterBottom
              style={{ color: "#ff6b35", marginBottom: "50px" }}
            >
              Choose to contact one of the following mentors
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={5}
              alignItems="center"
            >
              {mentors.map((mentor) => (
                <Card
                  key={mentor.id}
                  sx={{ width: 300, boxShadow: 3, textAlign: "center" }}
                >
                  {/* --- IMAGE COMPONENT REMOVED --- */}
                  <CardContent sx={{ p: 3 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {mentor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mentor.title}
                    </Typography>
                    <Stack spacing={2} direction="column" mt={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleContactClick}
                      >
                        Contact Me
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        component={Link}
                        to={`/profile/${mentor.id}`}
                      >
                        View Profile
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Contact Mentor Dialog */}
            <Dialog open={contactDialogOpen} onClose={handleDialogClose}>
              <DialogContent>
                <DialogContentText>
                  Mentor has been notified. You will be contacted soon!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Go to Home Page
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default FindMentorPage;
