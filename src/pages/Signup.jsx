import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout"; // Import our new layout

export default function Signup() {
  const navigate = useNavigate();
  // State to track if the user is a 'Mentee' or 'Mentor'
  const [role, setRole] = useState("Mentee");

  const handleRoleChange = (event, newRole) => {
    // Ensure a selection is always active
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleContinue = () => {
    if (role === "Mentee") {
      navigate("/signup-mentee-1");
    } else {
      navigate("/signup-mentor-1");
    }
  };

  return (
    // Use the AuthLayout as a wrapper
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        Create Account
      </Typography>

      <Typography sx={{ mt: 2, mb: 3 }}>
        Creating an account as a mentor or mentee?
      </Typography>

      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={handleRoleChange}
        aria-label="user role"
        color="primary"
        fullWidth
      >
        <ToggleButton value="Mentee" aria-label="mentee">
          Mentee
        </ToggleButton>
        <ToggleButton value="Mentor" aria-label="mentor">
          Mentor
        </ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ width: "100%", mt: 3 }}>
        <Button
          onClick={handleContinue}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "10px" }}
        >
          Continue
        </Button>
      </Box>
    </AuthLayout>
  );
}
