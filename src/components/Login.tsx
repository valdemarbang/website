import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";

function Login() {
  // All the error messages are stored in state, so we can display them in the form
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [remember, setRemember] = useState(false);

  // Handle checkbox remember me
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  // Handle submit button press
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Get form data, if not available set to empty string
    const email = (data.get("email") || "") as string;
    const password = (data.get("password") || "") as string;

    // Reset all errors before validation
    setEmailError("");
    setPasswordError("");

    // Simple form validation
    let hasErrors = false; // shitty way of doing this, but it works

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
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle response from server, maybe some errors was missed
    const responseData = await response.json();
    if (!response.ok) {
      if (responseData.emailError) {
        setEmailError(responseData.emailError);
      }
      if (responseData.passwordError) {
        setPasswordError(responseData.passwordError);
      }
    }
    // sucessful login
    else {
      if (remember) {
        localStorage.setItem("email", email);
        localStorage.setItem("token", responseData.token);
      }
      window.localStorage.setItem("successMsg", responseData.successMsg); // Store the success message
      window.location.href = "/"; // Redirect to the next page
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1F3559" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!emailError} // If its not empty string, set error to true
            helperText={emailError}
            required
            fullWidth
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={!!passwordError} // If its not empty string, set error to true
            helperText={passwordError}
            required
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={handleCheckboxChange}
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="MAYBE IMPLEMENT LATER?" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/website/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
