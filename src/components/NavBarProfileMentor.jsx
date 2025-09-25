import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoHat from "../assets/logo-hat.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

// Consistent navigation items for a mentor
const navItems = [
  { label: "Home", path: "/home" },
  { label: "My Events", path: "/events" },
  { label: "Progress", path: "/progress" },
  { label: "Messages", path: "/messages" },
];

export default function NavBarProfileMentor(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md")); // Changed to 'md' for better responsiveness

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Corrected mobile drawer with proper React Router Links
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={LogoHat} alt="Logo" style={{ width: "50px", margin: "10px" }} />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Special item for Create Event in mobile drawer */}
        <ListItem key="Create Event" disablePadding>
          <ListItemButton
            component={Link}
            to="/create-event"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Create Event" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#fff8f0",
          color: "#1c1c1c",
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          px: isMobile ? "10px" : "150px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }} // Changed to 'md'
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link to="/home">
              <img
                src={LogoHat}
                alt="Logo"
                style={{ width: "60px", marginRight: "10px", display: "block" }}
              />
            </Link>
          </Box>

          {/* Corrected Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {" "}
            {/* Changed to 'md' */}
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "#1c1c1c",
                  textTransform: "none",
                  fontWeight: 600,
                  mx: 1,
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              key="Create Event"
              component={Link}
              to="/create-event"
              variant="contained"
              sx={{
                backgroundColor: "#ff6b35",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                ml: 2,
              }}
            >
              Create Event
            </Button>
          </Box>

          <Box sx={{ flexGrow: { xs: 0, md: 1 } }} />

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "block" } }}>
            {" "}
            {/* Hide on smaller screens if overlapping */}
            <Tooltip title="My Account">
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
                component={Link}
                to="/profile"
                onClick={handleCloseUserMenu}
              >
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <LogoutIcon sx={{ color: "#f50057", mr: 1 }} />
                <Typography sx={{ color: "#f50057" }}>Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" }, // Changed to 'md'
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
