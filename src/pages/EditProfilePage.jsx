import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { db } from "../../backend/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import NavigationBar from "../components/NavigationBar";

export default function EditProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData((prevData) => ({ ...prevData, ...docSnap.data() }));
      } else {
        console.error("No such user document!");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userDocRef, profileData);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Your Profile
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={profileData.firstName || ""}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={profileData.lastName || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="occupation"
            label="Occupation (e.g., Student at University)"
            name="occupation"
            value={profileData.occupation || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="bio"
            label="Your Bio"
            name="bio"
            multiline
            rows={4}
            value={profileData.bio || ""}
            onChange={handleChange}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Social Links
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="linkedin"
            label="LinkedIn Username"
            name="linkedin"
            value={profileData.linkedin || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="github"
            label="GitHub Username"
            name="github"
            value={profileData.github || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="twitter"
            label="Twitter Username"
            name="twitter"
            value={profileData.twitter || ""}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, backgroundColor: "#ff6b35" }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Container>
    </>
  );
}
