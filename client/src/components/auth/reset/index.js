import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the Axios POST request to the backend
      const response = await axios.post("/api/v1/user/generate-token", { email });
      console.log(response.data); // Handle the response as needed

      // Display success message
      setResetLinkSent(true);
    } catch (error) {
      console.error(error);
      // Handle error cases
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Reset Password
      </Typography>

      {resetLinkSent ? (
        <Typography variant="body1" color="primary" align="center" gutterBottom>
          Reset link has been sent to your email successfully. Please check your
          inbox and follow the instructions to reset your password.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default ResetPasswordPage;
