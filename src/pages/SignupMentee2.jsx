import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../backend/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import AuthLayout from "../components/AuthLayout"; // Import our new layout

export default function SignupMentee2() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [educationLevel, setEducationLevel] = useState("");

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert(
        "Your session could not be found. Please try the signup process again."
      );
      console.error("currentUser is null, cannot update Firestore document.");
      navigate("/signup-mentee-1");
      return;
    }

    const userData = {
      educationLevel,
    };

    await updateDoc(doc(db, "users", currentUser.uid), userData);
    navigate("/signup-mentee-3");
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        Education Level
      </Typography>
      <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        What is your current or highest level of study?
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <RadioGroup
          aria-label="education-level"
          name="educationLevel"
          value={educationLevel}
          onChange={handleEducationLevelChange}
        >
          <Grid container spacing={1}>
            {/* Column 1 */}
            <Grid item xs={12} md={6}>
              <FormControlLabel
                value="No formal education"
                control={<Radio />}
                label="No formal education"
              />
              <FormControlLabel
                value="Secondary education/high school"
                control={<Radio />}
                label="Secondary education/high school"
              />
              <FormControlLabel
                value="Undergraduate / Bachelor’s Degree"
                control={<Radio />}
                label="Undergraduate / Bachelor’s Degree"
              />
              <FormControlLabel
                value="Diploma"
                control={<Radio />}
                label="Diploma"
              />
              <FormControlLabel
                value="Masters (Research)"
                control={<Radio />}
                label="Masters (Research)"
              />
            </Grid>
            {/* Column 2 */}
            <Grid item xs={12} md={6}>
              <FormControlLabel
                value="Masters (Professional)"
                control={<Radio />}
                label="Masters (Professional)"
              />
              <FormControlLabel
                value="Professional Doctorate"
                control={<Radio />}
                label="Professional Doctorate"
              />
              <FormControlLabel
                value="Community Colleges / TAFE"
                control={<Radio />}
                label="Community Colleges / TAFE"
              />
              <FormControlLabel
                value="Bootcamp"
                control={<Radio />}
                label="Bootcamp"
              />
              <FormControlLabel
                value="Vocational qualification"
                control={<Radio />}
                label="Vocational qualification"
              />
            </Grid>
          </Grid>
        </RadioGroup>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 1, padding: "10px" }}
        >
          Next
        </Button>
        <Typography variant="body2" align="center">
          <Link
            to="/signup-mentee-3"
            style={{ color: "#ff6b35", textDecoration: "none" }}
          >
            Skip
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
