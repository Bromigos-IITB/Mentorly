import React from "react";
import { useAuth } from "../AuthContext";
import NavigationBar from "../components/NavigationBar";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not logged in
  React.useEffect(() => {
    if (currentUser === null) {
      navigate("/landing");
    }
  }, [currentUser, navigate]);

  // Display a loading message until the user is verified
  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Welcome to Mentorly, {currentUser.displayName || currentUser.email}!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your journey to growth and connection starts here.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Complete Your Profile
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                A great profile helps you make better connections. Add your
                details to get started.
              </Typography>
              <Button
                component={Link}
                to="/profile"
                variant="contained"
                sx={{ backgroundColor: "#ff6b35", color: "white" }}
              >
                Go to Profile
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Explore Events
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Discover workshops, webinars, and sessions hosted by experienced
                mentors.
              </Typography>
              <Button
                component={Link}
                to="/events"
                variant="contained"
                sx={{ backgroundColor: "#ff6b35", color: "white" }}
              >
                Browse Events
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Find a Mentor
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Search for experienced professionals in your field and start a
                conversation.
              </Typography>
              <Button
                component={Link}
                to="/find-mentor"
                variant="contained"
                sx={{ backgroundColor: "#ff6b35", color: "white" }}
              >
                Find a Mentor
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
