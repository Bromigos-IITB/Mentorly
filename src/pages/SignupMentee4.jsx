import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db } from "../../backend/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function SignupMentee4() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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
      profileComplete: true,
    };

    try {
      await updateDoc(doc(db, "users", currentUser.uid), userData);
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
        You're All Set!
      </Typography>
      <Typography sx={{ mt: 2, mb: 3, textAlign: "center", maxWidth: "400px" }}>
        Thank you for joining. Click the button below to complete your
        registration and go to your dashboard.
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%", maxWidth: "350px" }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 3, mb: 2, padding: "10px" }}
        >
          {loading ? "Finalizing..." : "Complete Profile"}
        </Button>
      </Box>
    </AuthLayout>
  );
}
