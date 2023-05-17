import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { userDetailsAction } from "../../../store/actions/user";

const CenteredContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

const VerificationMessage = styled(Typography)(
  ({ theme, verificationResult }) => ({
    marginTop: "10px",
    fontWeight: "bold",
    color: verificationResult ? "green" : "red",
  })
);
const QRCodeContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
});

function TwoFactorAuthPage(props) {
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    //check if link login
    const url = window.location.href;
    const urlParts = url.split("=");
    const tokenFromUrl = urlParts[urlParts.length - 1];
    setToken(tokenFromUrl);
    // Retrieve the secret key from the backend
    axios
      .post("/api/v1/auth/2fa/generate", {
        username: props?.userName.details
          ? props?.userName?.details?.username
          : tokenFromUrl,
      })
      .then((response) => {
        setSecret(response.data.secret);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line
  }, []);

  const handleVerification = () => {
    // Send the entered code for verification to the backend
    axios
      .post("/api/v1/auth/2fa/verify", {
        username: props?.userName.details
          ? props?.userName?.details?.username
          : token,
        code: code,
        secret,
      })
      .then(async (response) => {
        setVerificationResult(response.data.success);
        localStorage.setItem("2FA", response.data.success);
        if (response.data.success) {
          await props.setUserDetailsAction();
          setTimeout(() => {
            setRedirect(true);
          }, 900);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <CenteredContainer>
      <ContentContainer>
        {secret && (
          <QRCodeContainer>
            <QRCode value={`otpauth://totp/MyApp?secret=${secret}`} />
          </QRCodeContainer>
        )}
        {verificationResult !== null && (
          <VerificationMessage
            variant="subtitle1"
            verificationResult={verificationResult}
          >
            {verificationResult
              ? "Verification successful"
              : "Verification failed"}
          </VerificationMessage>
        )}
        <TextField
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          variant="outlined"
          margin="normal"
          placeholder="Enter the verification code"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerification}
        >
          Verify
        </Button>
      </ContentContainer>
    </CenteredContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetailsAction: () => dispatch(userDetailsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorAuthPage);
