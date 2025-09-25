import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; // Using Link for navigation

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#ff6b35", // Correct primary orange color
        color: "white",
        padding: "30px 0",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Mentorly
        </Typography>
        <Box>
          <Link
            to="/privacy-policy"
            style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
          >
            Terms and Conditions
          </Link>
          <Link
            to="/sitemap"
            style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
          >
            Sitemap
          </Link>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Mentorly. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
