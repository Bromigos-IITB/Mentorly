import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../backend/Firebase";
import { doc, setDoc } from "firebase/firestore";
import AuthLayout from "../components/AuthLayout"; // Import our new layout

export default function SignupMentor1() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      // Create user data with the user_type set to "Mentor"
      const userData = {
        firstName,
        lastName,
        email,
        user_type: "Mentor",
        uid: user.uid,
      };

      await setDoc(doc(db, "users", user.uid), userData);
      // Navigate to the next step in the mentor flow
      navigate("/signup-mentor-2");
    } catch (err) {
      console.error("Error signing up:", err);
      setError(`Failed to create account: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        Create Mentor Account
      </Typography>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        component="form"
        noValidate
        onSubmit={handleSignUp}
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
          required
          autoFocus
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 3, padding: "10px" }}
        >
          {loading ? "Creating Account..." : "Next"}
        </Button>
      </Box>
    </AuthLayout>
  );
}
