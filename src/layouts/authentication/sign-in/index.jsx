/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpg";
import { useNavigate } from "react-router-dom";
import API_URLS from "../../../apiUrls";
import { GoogleLogin } from 'react-google-login';
import { token } from "stylis";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);


  
  const handleGoogleLoginFailure = (error) => {
    // Gérez les erreurs après une connexion échouée avec Google
    console.error("Erreur lors de la connexion avec Google:", error);
  };
  


  const handleGoogleLoginSuccess = (response) => {
    const token = response.tokenId;
    
    // Envoyer le jeton au backend
    sendTokenToBackend(token);
    console.log("Connexion réussie avec Google:", response);

  };
  
  axios.post('/api/login/google', { access_token: token })
  .then(response => {
    // Traitez la réponse du backend ici
    console.log("Réponse du backend:", response.data);
    
    // Par exemple, vous pouvez stocker le jeton JWT retourné dans le stockage local
    localStorage.setItem('token', response.data.token);
  })
  .catch(error => {
    // Gérez les erreurs en cas d'échec de la requête
    console.error("Erreur lors de la réception de la réponse du backend:", error);
    
    // Par exemple, affichez un message d'erreur à l'utilisateur
    alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
  });


  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        console.error("Veuillez saisir votre email et votre mot de passe.");
        return;
      }

      const response = await axios.post(API_URLS.login, {
        email: email,
        password: password
      });

      if (response.data.redirectUrl) {
        const userId = response.data.userId;
        localStorage.setItem("userId", userId);
        navigate(response.data.redirectUrl);
      } else {
        console.error("La connexion a échoué.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={handleEmailChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={handlePasswordChange} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={2} textAlign="center">
             {/*  */}
             <GoogleLogin
  clientId="895390000373-tboh2opauhrslulnr60d5p58v8qdhbhs.apps.googleusercontent.com"
  buttonText="Se connecter avec Google"
  onSuccess={handleGoogleLoginSuccess}
  onFailure={handleGoogleLoginFailure}
  cookiePolicy={'single_host_origin'}
/>

            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
