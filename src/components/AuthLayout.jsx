import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define the theme once for the layout
const theme = createTheme({
  palette: {
    background: {
      default: "#fff8f0", // Light orange background
    },
    primary: {
      main: "#ff6b35", // Primary orange
    },
  },
});

// This is our reusable layout component
export default function AuthLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* The Branding Side Panel */}
        <Grid
          item
          xs={false}
          sm={4}
          md={5} // Slightly wider for a better look
          sx={{
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            p: 3, // Add some padding
          }}
        >
          <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
            Mentorly
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Find Your Perfect Mentor
          </Typography>
        </Grid>

        {/* The Form Area */}
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "calc(100% - 128px)", // Center the content vertically
            }}
          >
            {/* All the page-specific content will be rendered here */}
            {children}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
