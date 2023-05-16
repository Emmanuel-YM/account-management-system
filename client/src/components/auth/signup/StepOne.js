import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ImageUploader from "react-images-upload";
import { CountryDropdown } from "react-country-region-selector";

const StepOne = ({ formData, setForm, nextStep }) => {
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoChange = (files) => {
    // store the profile photo as a file
    setForm({ ...formData, profilePhoto: files[0] });
  };

  const handleNext = () => {
    // Validation logic
    const {
      firstName,
      lastName,
      gender,
      age,
      dateOfBirth,
      maritalStatus,
      nationality,
    } = formData;
    if (
      firstName &&
      lastName &&
      gender &&
      age &&
      dateOfBirth &&
      maritalStatus &&
      nationality
    ) {
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
        User Profile
      </Typography>
      <ImageUploader
        withIcon={true}
        buttonText="Upload Profile Photo"
        onChange={handleProfilePhotoChange}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
        singleImage={true}
        withPreview={true}
      />
      <Box mb={1} />
      <TextField
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        mb={2}
        fullWidth
      />
      <Box mb={1} />
      <TextField
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        mb={2}
        fullWidth
      />
      <Box mb={1} />
      <FormControl fullWidth required mb={2}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <Box mb={1} />
      <TextField
        name="age"
        label="Age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        required
        mb={2}
        fullWidth
      />
      <Box mb={1} />
      <TextField
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
        mb={2}
        fullWidth
      />
      <Box mb={1} />
      <FormControl fullWidth required mb={2}>
        <InputLabel id="marital-status-label">Marital Status</InputLabel>
        <Select
          labelId="marital-status-label"
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="married">Married</MenuItem>
          <MenuItem value="divorced">Divorced</MenuItem>
          <MenuItem value="widowed">Widowed</MenuItem>
        </Select>
      </FormControl>
      <Box mb={1} />
      <Box width="100%" mb={2}>
        <InputLabel>Nationality</InputLabel>
        <CountryDropdown
          name="nationality"
          value={formData.nationality}
          onChange={(value) =>
            handleChange({ target: { name: "nationality", value } })
          }
          showDefaultOption={false}
          classes={{
            control: "MuiFormControl-root",
            selectMenu: "MuiSelect-root",
          }}
        />
      </Box>
      <Button variant="contained" onClick={handleNext} fullWidth>
        Next
      </Button>
    </Box>
  );
};

export default StepOne;
