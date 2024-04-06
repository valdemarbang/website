import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import SuccessAlert from './SuccessAlert';

function SignUp() {
  // States
  const [successMsg, setMessage] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  // Handle submit button press
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Get form data, if not available set to empty string
    const firstname = data.get("firstName") || "";
    const lastname = data.get("lastName") || "";
    const email = data.get("email") || "";
    const password = data.get("password") || "";

    // Request to server
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    // Reset all errors after an submit
    const responseData = await response.json();
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    // Handle response
    if (!response.ok) {
      if (responseData.firstNameError) {
        setFirstNameError(responseData.firstNameError);
      } if (responseData.lastNameError) {
        setLastNameError(responseData.lastNameError);
      } if (responseData.emailError) {
        setEmailError(responseData.emailError);
      } if (responseData.passwordError) {
        setPasswordError(responseData.passwordError);
      }
    }
    // sucessful signup
    else {
      window.localStorage.setItem('successMsg', responseData.successMsg); // Store the success message
      window.location.href = "/"; // Redirect to the next page
    }
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1F3559" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!firstNameError} // If its not empty string, set error to true
                helperText={firstNameError}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!lastNameError}
                helperText={lastNameError}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!emailError} // If its not empty string, set error to true
                helperText={emailError}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!passwordError} // If its not empty string, set error to true
                helperText={passwordError}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
