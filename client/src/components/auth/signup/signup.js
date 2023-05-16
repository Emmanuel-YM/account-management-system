import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import axios from "axios";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // StepOne fields
    profilePhoto: null,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    dateOfBirth: "",
    maritalStatus: "",
    nationality: "",
    // StepTwo fields
    nationalIdNumber: "",
    passport: "",
    officialDocument: null,
    // StepThree fields
    username: "",
    password: "",
    verifyPassword: "",
  });
  const [redirect, setRedirect] = useState(false);

  const steps = ["Step 1", "Step 2", "Step 3"];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    // Make the POST request using Axios
    axios
      .post("/api/v1/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle successful response
        if (response.data.status !== 200) {
          alert(response.data?.message);
        } else {
          setRedirect(true);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting form data:", error);
      });
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const renderStepComponent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepOne
            formData={formData}
            setForm={setFormData}
            nextStep={handleNext}
          />
        );
      case 1:
        return (
          <StepTwo
            formData={formData}
            setForm={setFormData}
            nextStep={handleNext}
          />
        );
      case 2:
        return (
          <StepThree
            formData={formData}
            setForm={setFormData}
            nextStep={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, idx) => (
          <Step key={idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepComponent(activeStep)}
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
    </div>
  );
};

export default SignUp;
