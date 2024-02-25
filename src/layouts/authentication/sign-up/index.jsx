import React, { useState } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpg";
import { Select, MenuItem, InputLabel } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

import "CSS/Cover.css"; // Import your custom CSS for styling
/* eslint-disable */

function Cover() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/add", formData);
      console.log(response.data);
      // Optionally, you can redirect the user after successful sign-up
    } catch (error) {
      if (error.response) {
        // Erreur de réponse du serveur avec un statut de réponse hors de la plage 2xx
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error("No response received:", error.request);
      } else {
        // Une erreur est survenue lors de la configuration de la requête
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  

  const steps = [
    {
      title: "Join us today",
      subtitle: "Enter your coordinates to register",
      fields: [
        { label: "First Name", type: "text", placeholder: "Enter your First Name" },
        { label: "Last Name", type: "text", placeholder: "Enter your Last Name" },
        {
          label: "Professional Status",
          placeholder: "Enter your Professional Status",
          type: "select",
          options: ["admin", "student", "teacher", "company", "subadmin", "alumni"],
        },
        { label: "Email", type: "email", placeholder: "Enter your Email" },
        { label: "Password", type: "password", placeholder: "Enter your Password" },
        { label: "Confirm Password", type: "password", placeholder: "Confirm your Password" },
      ],
    },
    {
      title: "Personal Information",
      subtitle: "Provide your personal details",
      fields: [
        { label: "Age", type: "number", placeholder: "Enter your Age" },
        { label: "City", type: "text", placeholder: "Enter your City" },
        { label: "Phone", type: "number", placeholder: "Enter your Phone number" },
        { label: "Speciality", type: "text", placeholder: "Computer Engineer, Civil Engineer, Business.." },
        { label: "Institution", type: "text", placeholder: "Enter your Institution" },
        { label: "Languages", type: "text", placeholder: "Enter your Languages" },
      ],
    },
    {
      title: "Profile Information",
      subtitle: "Add your profile details",
      fields: [
        { label: "Profile Image", type: "file" },
        { label: "Description", type: "text", placeholder: "Speak about yourself" },
      ],
    },
  ];

  const currentStep = steps[activeStep];

  const handleFieldChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  const isLastStep = activeStep === steps.length - 1;

  const isSignUpDisabled = isLastStep && Object.values(formData).some((value) => value === "");

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {currentStep && currentStep.title}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {currentStep && currentStep.subtitle}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            {currentStep && currentStep.fields.map((field, index) => (
              <MDBox key={index} mb={2}>
                {field.type === "select" ? (
                  <div>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={formData[field.label] || ""}
                      onChange={(e) => handleFieldChange(field.label, e.target.value)}
                      fullWidth
                      variant="standard"
                      IconComponent={ArrowDropDownIcon}
                      SelectDisplayProps={{
                        style: { display: "flex", alignItems: "center" },
                      }}
                    >
                      {/* Map options */}
                      {field.options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <>
                    {field.type === "file" ? (
                      <div className="file-input-container">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFieldChange(field.label, e.target.files[0])}
                        />
                        <label htmlFor="profile-image" className="upload-button">
                          Upload Profile Image
                        </label>
                      </div>
                    ) : (
                      <MDInput
                        type={field.type}
                        label={field.label}
                        variant="standard"
                        fullWidth
                        value={formData[field.label] || ""}
                        onChange={(e) => handleFieldChange(field.label, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </>
                )}
              </MDBox>
            ))}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleNextStep}
                disabled={isSignUpDisabled}
              >
                {isLastStep ? "Sign Up" : "Next"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              {activeStep > 0 && (
                <MDButton variant="text" color="info" onClick={handlePrevStep}>
                  Back
                </MDButton>
              )}
            </MDBox>
            {isLastStep && (
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
