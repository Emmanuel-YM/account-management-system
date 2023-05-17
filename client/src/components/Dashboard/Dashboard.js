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
} from "@mui/icons-material";
import axios from "axios";
import { Navigate } from "react-router-dom";

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
  background-color: #e0f7fa;
`;

const Dashboard = () => {
  const [redirect, setRedirect] = React.useState(false);
  const handleLogout = async () => {
    // Perform logout actions here
    await axios.post("api/v1/user/logout");
    setTimeout(() => {
      setRedirect(true);
    }, 5000);
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
          <VerifiedIcon />
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
                  Welcome User
                </Typography>
                <Typography variant="body2">
                  This is your personal dashboard. Enjoy your stay!
                </Typography>
              </WelcomeCard>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContainer>
              <VerificationCard>
                <Typography variant="h6" component="div">
                  Verification Status
                </Typography>
                <Typography variant="body2">
                  Your account is verified. Congratulations!
                </Typography>
              </VerificationCard>
            </CardContainer>
          </Grid>
        </Grid>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
