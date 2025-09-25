import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../../backend/Firebase";
import { doc, getDoc } from "firebase/firestore";
import NavBarMentor from "../components/NavBarProfileMentor";
import NavBarMentee from "../components/NavBarProfileMentee";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Container,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Link, useParams, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../components/Footer";

const mainTheme = createTheme({
  palette: {
    background: { default: "#fff8f0" },
    primary: { main: "#ff6b35" },
  },
  typography: {
    name_font: { fontSize: "1.25rem", fontWeight: 700 },
    bold_font: { fontWeight: 700 },
  },
});

export default function ProfilePage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/landing");
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      const profileId = id || currentUser.uid; // Use URL id if it exists, otherwise use current user's id
      const docRef = doc(db, "users", profileId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log("No such document!");
        navigate("/home"); // Or a 404 page
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [id, currentUser, navigate]);

  const handleSocialsButtonClick = (website, username) => {
    if (!username) return;
    const urls = {
      linkedin: `https://www.linkedin.com/in/${username}`,
      github: `https://github.com/${username}`,
      twitter: `https://twitter.com/${username}`,
    };
    window.open(urls[website], "_blank");
  };

  if (loading || !profileData) {
    return (
      <ThemeProvider theme={mainTheme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CssBaseline />
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  const isOwnProfile = !id || id === currentUser.uid;

  return (
    <ThemeProvider theme={mainTheme}>
      {profileData.user_type === "Mentor" ? <NavBarMentor /> : <NavBarMentee />}
      <Box
        sx={{
          display: "flex",
          mt: "100px",
          mb: "100px",
          px: isMobile ? "10px" : "175px",
        }}
      >
        <CssBaseline />
        {/* SIDEBAR BOX */}
        <Box
          sx={{
            width: isMobile ? "100%" : "30%",
            pr: isMobile ? 0 : "20px",
            "& > *:not(:last-child)": { mb: 2 },
          }}
        >
          <Avatar sx={{ width: "120px", height: "120px" }} />
          <Typography
            variant="name_font"
            style={{ display: "flex", alignItems: "center" }}
          >
            {profileData.firstName} {profileData.lastName}
            {profileData.user_type === "Mentor" && (
              <>
                <Tooltip title="Mentor">
                  <SchoolIcon sx={{ color: "primary.main", mx: "5px" }} />
                </Tooltip>
                <Tooltip title="Verified">
                  <VerifiedIcon sx={{ color: "primary.main" }} />
                </Tooltip>
              </>
            )}
          </Typography>

          {/* Display Occupation */}
          <Typography>
            {profileData.occupation || "No occupation specified."}
          </Typography>

          {/* Display Bio */}
          <Typography>{profileData.bio || "No bio provided."}</Typography>

          <Divider />

          {/* Display Social Icons/Buttons */}
          <Box>
            {profileData.linkedin && (
              <Tooltip title={`LinkedIn: ${profileData.linkedin}`}>
                <IconButton
                  onClick={() =>
                    handleSocialsButtonClick("linkedin", profileData.linkedin)
                  }
                >
                  <LinkedInIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {profileData.github && (
              <Tooltip title={`GitHub: ${profileData.github}`}>
                <IconButton
                  onClick={() =>
                    handleSocialsButtonClick("github", profileData.github)
                  }
                >
                  <GitHubIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {profileData.twitter && (
              <Tooltip title={`Twitter: ${profileData.twitter}`}>
                <IconButton
                  onClick={() =>
                    handleSocialsButtonClick("twitter", profileData.twitter)
                  }
                >
                  <TwitterIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {isOwnProfile && (
            <>
              <Divider />
              <Button
                component={Link}
                to="/edit-profile"
                variant="contained"
                color="primary"
                sx={{ color: "#fff", textTransform: "none" }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Box>

        {/* MAIN CONTENT BOX (hidden on mobile for now to simplify) */}
        <Box
          sx={{ pl: "20px", flexGrow: 1, display: isMobile ? "none" : "block" }}
        >
          <Typography variant="bold_font">
            {isOwnProfile ? "My Profile" : `${profileData.firstName}'s Profile`}
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
          {/* Other content like posts, events, etc. can go here */}
          <Typography>Events and posts will be shown here.</Typography>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
