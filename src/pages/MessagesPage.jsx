import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavigationBar from "../components/NavigationBar";

export default function MessagesPage() {
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
            Your Conversations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A dedicated space for your private messages with mentors and mentees
            is currently under construction.
            <br />
            Stay tuned!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
