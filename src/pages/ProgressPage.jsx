import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavigationBar from "../components/NavigationBar";

export default function ProgressPage() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Track Your Growth
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is where you will see your mentorship progress, milestones, and
            achievements.
            <br />
            This feature is coming soon!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
