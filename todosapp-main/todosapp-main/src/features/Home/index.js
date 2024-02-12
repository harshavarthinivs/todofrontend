import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useHistory
import Navbar from "../../components/Navbar";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import Todo from "../Todo";

const Home = () => {
  const login = useSelector((state) => state.login.isLoggedIn);
  useCustomSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login, navigate]);

  if (login) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            marginTop: "2vh",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Todo />
        </Box>
      </>
    );
  }
};

export default Home;
