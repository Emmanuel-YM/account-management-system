import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import zxcvbn from "zxcvbn";
import { Navigate } from "react-router-dom";

const ChangePinPage = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    handleTokenExtraction();
  }, []);

  const handleTokenExtraction = () => {
    const url = window.location.href;
    const urlParts = url.split("=");
    const tokenFromUrl = urlParts[urlParts.length - 1];
    setToken(tokenFromUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== verifyPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const passwordStrength = zxcvbn(newPassword);

    if (passwordStrength.score < 2) {
      setErrorMessage(
        "Password is too weak. Please choose a stronger password."
      );
      return;
    }

    try {
      // Make the Axios POST request to the backend
      const response = await axios.post("/api/v1/user/reset-password", {
        token,
        newPassword,
      });

      if (response.data.message === "Password changed successfully") {
        setTimeout(() => {
          setRedirect(true);
        }, 700);
      }

      // Reset the form and display a success message
      setNewPassword("");
      setVerifyPassword("");
      setErrorMessage("Password has been successfully reset.");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while resetting the password.");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>

      {token ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            label="Verify Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>

          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}
        </form>
      ) : (
        <Typography variant="body2" align="center">
          Token not found.
        </Typography>
      )}
    </Container>
  );
};

export default ChangePinPage;
