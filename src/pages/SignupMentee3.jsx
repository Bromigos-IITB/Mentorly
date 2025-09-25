import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../backend/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function SignupMentee3() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      alert(
        "Your session could not be found. Please try the signup process again."
      );
      navigate("/signup-mentee-1");
      return;
    }

    const userData = {
      menteeInterests: interests,
      menteeSkillsToLearn: skills,
      menteeCareerGoals: goals,
    };

    try {
      await updateDoc(doc(db, "users", currentUser.uid), userData);
      navigate("/signup-mentee-4");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to save your information. Please try again.");
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        Your Interests
      </Typography>
      <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        Help us understand what you're passionate about.
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
          id="interests"
          label="Field(s) of Interest (e.g., Web Development, AI)"
          name="interests"
          autoFocus
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="skills"
          label="Skills You Want to Learn (e.g., React, Python)"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="goals"
          label="Your Career Goals"
          id="goals"
          multiline
          rows={3}
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
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
            to="/signup-mentee-4"
            style={{ color: "#ff6b35", textDecoration: "none" }}
          >
            Skip
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
