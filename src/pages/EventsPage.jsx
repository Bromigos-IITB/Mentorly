import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Footer from "../components/Footer.jsx";
import NavigationBar from "../components/NavigationBar"; // Using the consistent, fixed navbar
import EventIcon from "@mui/icons-material/Event"; // A generic icon for events
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { db } from "../../backend/Firebase.js";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";

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

const EventsPage = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/landing");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const handleSearch = (query) => {
    const filteredData = events.filter(
      (item) =>
        item.eventName.toLowerCase().includes(query.toLowerCase()) ||
        item.hostedBy.toLowerCase().includes(query.toLowerCase()) ||
        item.about.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filteredData);
  };

  const handleRegisterClick = async (selectedEvent) => {
    const parentDocumentRef = doc(db, "users", currentUser.uid);
    const subcollectionRef = collection(parentDocumentRef, "events");
    await addDoc(subcollectionRef, selectedEvent);
    setRegistrationDialogOpen(true);
  };

  const handleRegistrationDialogClose = () => {
    setRegistrationDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar onSearch={handleSearch} />
      <Container sx={{ py: 8, mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Current Events
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              sx={{
                display: "flex",
                width: { xs: "100%", md: "800px" },
                boxShadow: 3,
              }}
            >
              {/* Replaced the old image with a themed placeholder Box */}
              <Box
                sx={{
                  minWidth: { xs: 120, md: 250 },
                  backgroundColor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <EventIcon sx={{ fontSize: 80, color: "white" }} />
              </Box>
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <div>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.eventName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hosted By: {event.hostedBy}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ my: 2 }}
                  >
                    About: {event.about}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {event.location}
                  </Typography>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRegisterClick(event)}
                    sx={{ width: "49%", color: "white" }}
                  >
                    Register
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: "49%" }}
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    View Event
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Registration Confirmation Dialog */}
      <Dialog
        open={registrationDialogOpen}
        onClose={handleRegistrationDialogClose}
      >
        <DialogContent>
          <DialogContentText>
            Registration confirmed! You will receive further details via email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegistrationDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </ThemeProvider>
  );
};

export default EventsPage;
