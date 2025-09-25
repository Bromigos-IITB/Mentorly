import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../backend/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import AuthLayout from "../components/AuthLayout"; // Import our new layout

export default function SignupMentor3() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [employer, setEmployer] = useState("");
  const [position, setPosition] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      alert(
        "Your session could not be found. Please try the signup process again."
      );
      navigate("/signup-mentor-1");
      return;
    }

    const userData = {
      mentorCurrentEmployer: employer,
      mentorPosition: position,
      mentorIndustry: industry,
      mentorYearsOfExperience: experience,
    };

    try {
      await updateDoc(doc(db, "users", currentUser.uid), userData);
      navigate("/signup-mentor-4");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to save your information. Please try again.");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        Professional Experience
      </Typography>
      <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        Tell us a bit about your professional background.
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="employer"
          label="Current Employer"
          name="employer"
          autoFocus
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="position"
          label="Position / Job Title"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="industry"
          label="Industry"
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="experience"
          label="Years of Experience in Industry"
          id="experience"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 3, mb: 1, padding: "10px" }}
        >
          {loading ? "Saving..." : "Next"}
        </Button>
        <Typography variant="body2" align="center">
          <Link
            to="/signup-mentor-4"
            style={{ color: "#ff6b35", textDecoration: "none" }}
          >
            Skip
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
