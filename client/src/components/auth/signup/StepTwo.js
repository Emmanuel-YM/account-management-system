import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ImageUploader from "react-images-upload";

const StepTwo = ({ formData, setForm, nextStep }) => {
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOfficialDocumentChange = (files) => {
    // store the official document image as a file
    setForm({ ...formData, officialDocument: files[0] });
  };

  const handleNext = () => {
    // Validation logic 
    const { nationalIdNumber, passport, officialDocument } = formData;
    if ((nationalIdNumber || passport) && officialDocument) {
      nextStep();
    } else {
      alert("Please fill in all the required fields");
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
        National ID Details
      </Typography>
      <TextField
        name="nationalIdNumber"
        label="National Identification Number"
        value={formData.nationalIdNumber}
        onChange={handleChange}
        mb={2}
        fullWidth
      />
      <Box mb={1} />
      <TextField
        name="passport"
        label="Passport Number"
        value={formData.passport}
        onChange={handleChange}
        mb={2}
        fullWidth
      />
      <Box mb={1} />
      <ImageUploader
        withIcon={true}
        buttonText="Upload Official Document"
        onChange={handleOfficialDocumentChange}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
        singleImage={true}
        withPreview={true}
      />
      <Box mb={2} />
      <Button variant="contained" onClick={handleNext} fullWidth>
        Next
      </Button>
    </Box>
  );
};

export default StepTwo;
