import React from "react";
import { styled } from "@mui/system";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  HomeOutlined,
  ExitToAppOutlined,
  VerifiedUserOutlined,
  Close,
} from "@mui/icons-material";
import PendingIcon from "@mui/icons-material/Pending";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const DashboardContainer = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Navbar = styled(AppBar)`
  flex-shrink: 0;
`;

const Content = styled("div")`
  flex-grow: 1;
  padding: 20px;
`;

const LogoutButton = styled(IconButton)`
  margin-left: auto;
`;

const VerifiedIcon = styled(VerifiedUserOutlined)`
  margin-left: 10px;
`;

const HomeLink = styled(Typography)`
  display: flex;
  align-items: center;
`;

const CardContainer = styled(Card)`
  margin-bottom: 20px;
`;

const WelcomeCard = styled(CardContent)`
  background-color: #f5f5f5;
`;

const VerificationCard = styled(CardContent)`
  background-color: ${({ status }) => {
    if (status === "VERIFIED") return "#c8e6c9";
    if (status === "PENDING") return "#e0e0e0";
    if (status === "UNVERIFIED") return "#ffcdd2";
    return "#f5f5f5";
  }};
`;

const VerificationMessage = styled(Typography)`
  color: ${({ status }) => {
    if (status === "VERIFIED") return "#4caf50";
    if (status === "PENDING") return "#757575";
    if (status === "UNVERIFIED") return "#f44336";
    return "inherit";
  }};
`;

const Dashboard = (props) => {
  const [redirect, setRedirect] = React.useState(false);
  const [user] = React.useState(props.userDetails.user);
  const handleLogout = async () => {
    // Perform logout actions here
    await axios.post("api/v1/user/logout");
    localStorage.removeItem("2FA");
    setTimeout(() => {
      setRedirect(true);
    }, 2000);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <DashboardContainer>
      <Navbar position="static">
        <Toolbar>
          <HomeLink variant="h6">
            <HomeOutlined fontSize="small" />
            Home
          </HomeLink>
          {user.verification === "VERIFIED" && (
            <VerifiedIcon style={{ color: "#4caf50" }} />
          )}
          {user.verification === "UNVERIFIED" && (
            <Close style={{ color: "#f44336" }} />
          )}
          {user.verification === "PENDING" && (
            <PendingIcon style={{ color: "#757575" }} />
          )}
          <LogoutButton color="inherit" onClick={handleLogout}>
            Logout
            <ExitToAppOutlined fontSize="small" />
          </LogoutButton>
        </Toolbar>
      </Navbar>
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardContainer>
              <WelcomeCard>
                <Typography variant="h6" component="div">
                  Welcome {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Typography variant="body2">
                  This is your personal dashboard. Enjoy your stay!
                </Typography>
              </WelcomeCard>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContainer>
              <VerificationCard status={user.verification}>
                <Typography variant="h6" component="div">
                  Verification Status
                </Typography>
                {user.verification === "VERIFIED" && (
                  <VerificationMessage status={user.verification}>
                    Your account is verified. Congratulations!
                  </VerificationMessage>
                )}
                {user.verification === "PENDING" && (
                  <VerificationMessage status={user.verification}>
                    Your account is pending verification.
                  </VerificationMessage>
                )}
                {user.verification === "UNVERIFIED" && (
                  <VerificationMessage status={user.verification}>
                    Please contact the admin for verification.
                  </VerificationMessage>
                )}
              </VerificationCard>
            </CardContainer>
          </Grid>
        </Grid>
      </Content>
    </DashboardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
