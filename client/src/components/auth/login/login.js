import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setData } from "../../../store/actions/auth";
import { Link as RouterLink } from "react-router-dom";

const RootContainer = styled("div")`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 400px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

const FormContainer = styled("form")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ButtonContainer = styled("div")`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const ErrorMessage = styled(Typography)`
  color: red;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submission logic
    setError("");
    axios
      .post("/api/v1/user/login", { username, password })
      .then((response) => {
        // Handle successful response
        if (response.data?.status) {
          setError(response.data?.message);
        } else {
          props.setUserDataAction({ username });
          setRedirect(true);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting  data:", error);
      });
  };

  if (redirect) {
    return <Navigate to="/2fa" />;
  }

  return (
    <RootContainer>
      <Container maxWidth="sm">
        <StyledPaper elevation={3}>
          {error && (
            <ErrorMessage variant="body2" align="center">
              {error}
            </ErrorMessage>
          )}
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <FormContainer onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={handleEmailChange}
            />
            <TextField
              label="Password"
              name="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <ButtonContainer>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
              >
                Login
              </Button>
            </ButtonContainer>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link component={RouterLink} to="/signUp" variant="body2">
                  Sign Up
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/resetPassword"
                  variant="body2"
                >
                  Reset Password
                </Link>
              </Grid>
            </Grid>
          </FormContainer>
        </StyledPaper>
      </Container>
    </RootContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDataAction: (data) => dispatch(setData(data)),
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);
