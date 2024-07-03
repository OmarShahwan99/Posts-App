import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { signOutUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import useSession from "../../utils/use-session";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const { user } = useSession();

  const handleLogout = () => {
    dispatch(signOutUser())
      .unwrap()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  return (
    <Box
      component="header"
      bgcolor="#fff"
      boxShadow={
        " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
      }
      width="100%"
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" py={2}>
          <Typography variant="h5">{user?.email}</Typography>
          <LoadingButton
            onClick={handleLogout}
            loading={auth.status === "loading"}
            loadingPosition="start"
          >
            Logout
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
