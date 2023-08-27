import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import {
    Form,
    useLoaderData,
    useFetcher,
  } from "react-router-dom";

import { auth } from "../users";

  
const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

function _turnstileCb() {
  turnstile.render('#cf-turnstile', {
    sitekey: '0x4AAAAAAAJLhNJaATR5H2xv',
    theme: 'dark',
    size: 'normal',
  });
}
  

export default function Login() {
  const [showBanner, setShowBanner] = useState(false);
  const [bannerType, setBannerType] = useState('success');
  const [bannerMessage, setBannerMessage] = useState('');

  async function handleSubmit(event) {
    setShowBanner(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const authResponse = await auth(data.get("email"), data.get("password"));
    console.log(authResponse);
    if (authResponse.status === false) {
      setShowBanner(true);
      setBannerType('error');
      setBannerMessage(authResponse.err);
    }
  };

  useEffect(() => {
    _turnstileCb();
  });

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
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {showBanner && <Alert sx={{marginTop: "1rem"}} severity={bannerType}>{bannerMessage}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ThemeProvider theme={theme}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="primary"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
            />
            <div className="cf-turnstile-outer-div">
              <div id="cf-turnstile"></div>
            </div>
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Box>
    </Container>
  );
}