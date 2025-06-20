import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Brightness4,
  Brightness7,
  Palette,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = ({ onMenuClick }) => {
  const { darkMode, toggleDarkMode, primaryColor, setPrimaryColor, themeColors } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [colorMenuAnchor, setColorMenuAnchor] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColorMenuOpen = (event) => {
    setColorMenuAnchor(event.currentTarget);
  };

  const handleColorMenuClose = () => {
    setColorMenuAnchor(null);
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    handleColorMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Employee Management Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton color="inherit" onClick={handleColorMenuOpen}>
            <Palette />
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        <Menu
          anchorEl={colorMenuAnchor}
          open={Boolean(colorMenuAnchor)}
          onClose={handleColorMenuClose}
        >
          {Object.entries(themeColors).map(([colorName, colorValue]) => (
            <MenuItem key={colorName} onClick={() => handleColorChange(colorName)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: colorValue,
                  }}
                />
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {colorName}
                </Typography>
                {primaryColor === colorName && <Chip label="Active" size="small" />}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
