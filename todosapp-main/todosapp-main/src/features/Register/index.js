import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { enqueueSnackbar } from "notistack";
import RegisterImage from "../../assets/registerPageBack.jpg";

import { useNavigate } from "react-router-dom";
import registerApi from "../../api/registerApi";

const enqueErrorMessage = (message) => {
  enqueueSnackbar(`Please enter ${message}`, {
    variant: "warning",
    autoHideDuration: 3000,
  });
};

const validate = (data) => {
  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const email = data.get("email");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const username = data.get("username");

  if (firstName === "") {
    enqueErrorMessage("First Name");
    return false;
  }
  if (lastName === "") {
    enqueErrorMessage("Last Name");
    return false;
  }
  if (username === "") {
    enqueErrorMessage("Username");
    return false;
  }
  if (email === "") {
    enqueErrorMessage("Email");
    return false;
  }
  if (password === "") {
    enqueErrorMessage("Password");
    return false;
  }
  if (password !== confirmPassword) {
    enqueueSnackbar("Passwords do not match", {
      variant: "warning",
      autoHideDuration: 3000,
    });
    return false;
  }
  return true;
};

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (validate(data)) {
      const dataFromApi = await registerApi(data);
      if (dataFromApi.hasOwnProperty("token")) {
        enqueueSnackbar("User Registered Successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/login");
      } else {
        enqueueSnackbar(dataFromApi.message, {
          variant: "warning",
          autoHideDuration: 3000,
        });
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={5}>
        <Paper
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                REGISTER
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
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
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
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
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirm-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  REGISTER
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        style={{
          backgroundImage: `url(${RegisterImage})`,
          backgroundSize: "cover",
        }}
      ></Grid>
    </Grid>
  );
};

export default Register;
