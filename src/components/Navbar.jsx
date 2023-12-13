import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/images/logo-3.png";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Link, useNavigate } from "react-router-dom";

function NavigationBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserLogin = () => {
    navigate("/login");
  };

  const handleOwnerLogin = () => {
    navigate("/ownerlogin");
  };
  const handleAgentLogin =()=>{
   
    navigate("/agentlogin");

  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ownerToken");
    navigate("/");
  };

  return (
    <div   style={{ boxShadow: "0.5px 0.5px 10px #000" }}>
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand>
              <img
                src={logo}
                style={{ width: "50px", height: "50px" }}
                alt="logo"
              />
              <span style={{ fontWeight: "bold" }}>
                Pg<span style={{ color: "red" }}>Vala</span>
              </span>
            </Navbar.Brand>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login Choice">
              <IconButton
                sx={{ p: 0 }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="error"
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "20px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                onClick={handleUserLogin}
              >
                <AccountCircleIcon
                  color="error"
                  sx={{ marginRight: "0.5rem" }}
                />
                Login as User
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                onClick={handleOwnerLogin}
              >
                <AdminPanelSettingsIcon
                  color="error"
                  sx={{ marginRight: "0.5rem" }}
                />
                Login as Owner
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                onClick={handleAgentLogin}
              >
                <AdminPanelSettingsIcon
                  color="error"
                  sx={{ marginRight: "0.5rem" }}
                />
                Login as Agent
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                onClick={handleLogout}
              >
                <PersonOffIcon
                  color="error"
                  sx={{ marginRight: "0.5rem" }}
                />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
