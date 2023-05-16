import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // StepOne fields
    profilePhoto: null,
    firstName: "",
    lastName: "",
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

  const steps = ["Step 1", "Step 2", "Step 3"];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log(formData, "formData1");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    console.log(formData, "formData2");
    // Make the POST request using Axios
    // axios
    //   .post('/api/signup', formData)
    //   .then((response) => {
    //     // Handle successful response
    //     console.log('Form data submitted successfully:', response.data);
    //     //  navigate to a success page or perform any other actions
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error submitting form data:', error);
    //     // display an error message or perform any other actions
    //   });
  };

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
