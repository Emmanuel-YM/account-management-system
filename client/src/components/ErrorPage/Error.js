import React from "react";
import { Typography, Box } from "@mui/material";

const Error404 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page not found</Typography>
    </Box>
  );
};

export default Error404;
