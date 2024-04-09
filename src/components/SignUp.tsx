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

function SignUp() {
  // All the error messages are stored in state, so we can display them in the form
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle submit button press
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Get form data, if not available set to empty string
    const firstname = (data.get("firstName") || "") as string;
    const lastname = (data.get("lastName") || "") as string;
    const email = (data.get("email") || "") as string;
    const password = (data.get("password") || "") as string;
    
    // Reset all errors before validation
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    // Simple form validation
    let hasErrors = false; // shitty way of doing this, but it works
    if (firstname.trim() === "") { // trim removes whitespace
      setFirstNameError("First name is required");
      hasErrors = true;
    }

    if (lastname.trim() === "") {
      setLastNameError("Last name is required");
      hasErrors = true;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasErrors = true;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Request to server
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    // Handle response from server, maybe some errors was missed
    const responseData = await response.json();
    if (!response.ok) {
      if (responseData.firstNameError) {
        setFirstNameError(responseData.firstNameError);
      }
      if (responseData.lastNameError) {
        setLastNameError(responseData.lastNameError);
      }
      if (responseData.emailError) {
        setEmailError(responseData.emailError);
      }
      if (responseData.passwordError) {
        setPasswordError(responseData.passwordError);
      }
    }
    // sucessful signup
    else {
      window.localStorage.setItem("successMsg", responseData.successMsg); // Store the success message
      window.location.href = "/"; // Redirect to the next page
    }
  };

  // Create the design of the page
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
              <Link href="/login" variant="body2">
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
