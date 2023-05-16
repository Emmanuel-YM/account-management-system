import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import zxcvbn from "zxcvbn";

const StepThree = ({ formData, setForm, nextStep }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });

    if (name === "password") {
      const passwordResult = zxcvbn(value);
      setPasswordStrength(passwordResult.score);
    }
  };

  const handleNext = () => {
    // Validation logic
    const { username, password, verifyPassword } = formData;
    if (username && password && verifyPassword && password === verifyPassword) {
      nextStep();
    } else {
      alert("Please fill in all the required fields correctly");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="400px"
      mx="auto"
      p={3}
    >
      <Typography variant="h4" mb={2}>
        Account Details
      </Typography>
      <TextField
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        required
        mb={2}
        fullWidth
      />
      <Box mb={2} />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={passwordStrength < 2}
        helperText={
          passwordStrength < 2 &&
          "Password should be strong and include a combination of uppercase, lowercase, digits, and special characters"
        }
        mb={2}
        fullWidth
      />
      <Box mb={2} />
      <TextField
        name="verifyPassword"
        label="Verify Password"
        type="password"
        value={formData.verifyPassword}
        onChange={handleChange}
        required
        error={formData.password !== formData.verifyPassword}
        helperText={
          formData.password !== formData.verifyPassword &&
          "Passwords do not match"
        }
        mb={2}
        fullWidth
      />
      <Box mb={2} />
      <Button variant="contained" onClick={handleNext} fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default StepThree;
