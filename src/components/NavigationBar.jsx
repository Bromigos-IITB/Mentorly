import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoHat from "../assets/logo-hat.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import SearchBar from "./SearchBar";
import LogoutIcon from "@mui/icons-material/Logout";

// Define the navigation items with their paths
const navItems = [
  { label: "Home", path: "/home" },
  { label: "My Events", path: "/events" },
  { label: "Progress", path: "/progress" },
  { label: "Messages", path: "/messages" },
];

export default function NavigationBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    handleCloseUserMenu();
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff8f0",
        color: "#1c1c1c",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        px: { xs: 2, md: 10 },
      }}
    >
      <Toolbar disableGutters>
        {/* Logo */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            mr: 2,
          }}
        >
          <Link
            to="/home"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={LogoHat} alt="Logo" style={{ width: "60px" }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 1,
                fontWeight: 700,
                color: "#1c1c1c",
              }}
            >
              Mentorly
            </Typography>
          </Link>
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={handleCloseNavMenu}
                component={Link}
                to={item.path}
              >
                <Typography textAlign="center">{item.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Mobile Logo */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Link to="/home" style={{ display: "flex", alignItems: "center" }}>
            <img src={LogoHat} alt="Logo" style={{ width: "50px" }} />
          </Link>
        </Box>

        {/* Search Bar */}
        <SearchBar onSearch={props.onSearch} />
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: "#1c1c1c",
                display: "block",
                textTransform: "none",
                fontWeight: 600,
                mx: 1,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* User Avatar and Menu */}
        <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
              component={Link}
              to="/profile"
            >
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <LogoutIcon sx={{ color: "#f50057", mr: 1 }} />
              <Typography sx={{ color: "#f50057" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
