import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Popover, Tooltip, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
import { logout as clearLogin } from "../redux/slices/loginSlice";

export const UserDetails = () => {
  const username = useSelector((state) => state.login.user?.username);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [, , clearToken] = useLocalStorage("token", "");

  const handleButtonClickLogin = () => {
    // logout button is currently in navbar so clear localstorage
    clearToken();
    dispatch(clearLogin());
    enqueueSnackbar("logged out successfully", {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const popover = (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleButtonClickLogin}
        >
          LOGOUT
        </Button>
      </Box>
    </Popover>
  );

  let component = (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <AccountCircleIcon
        fontSize="large"
        onClick={handlePopoverOpen}
        color="white"
        sx={{
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <MenuIcon fontSize="large" />
      </AccountCircleIcon>
    </Box>
  );

  return (
    <>
      <Tooltip title={username}>{component}</Tooltip>
      {popover}
    </>
  );
};
