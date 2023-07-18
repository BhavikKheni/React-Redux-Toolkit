import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={gotoHome}
            style={{ cursor: "pointer" }}
          >
            Films
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
