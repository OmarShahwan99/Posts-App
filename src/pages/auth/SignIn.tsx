import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Container,
  Typography,
  Box,
  Avatar,
  Alert,
} from "@mui/material";
import { resetError, signIn } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  useEffect(() => {
    dispatch(resetError());
  }, [email, password, location.pathname]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "30px 40px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {auth.error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {auth.error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={auth.status === "loading"}
            loadingPosition="end"
          >
            Sign In
          </LoadingButton>

          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
