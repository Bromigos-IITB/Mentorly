import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db } from "../../backend/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import AuthLayout from "../components/AuthLayout"; // Import our new layout

export default function SignupMentor4() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mentoringExperience, setMentoringExperience] = useState("");
  // FIX: Changed 'False' to 'false'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      alert(
        "Your session could not be found. Please start the signup process again."
      );
      navigate("/signup");
      return;
    }

    const userData = {
      mentorYearsOfMentoring: mentoringExperience,
      profileComplete: true,
    };

    try {
      await updateDoc(doc(db, "users", currentUser.uid), userData);
      // Navigate to the home page after successful signup
      navigate("/home");
    } catch (error) {
      console.error("Error finalizing profile:", error);
      alert("Failed to create your account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        Mentoring Experience
      </Typography>
      <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        How many years of experience do you have in mentoring?
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%", maxWidth: "350px" }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="mentoringExperience"
          label="Years of Experience Mentoring"
          name="mentoringExperience"
          type="number"
          autoFocus
          value={mentoringExperience}
          onChange={(e) => setMentoringExperience(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 3, mb: 2, padding: "10px" }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </Box>
    </AuthLayout>
  );
}
