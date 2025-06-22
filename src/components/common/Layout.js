import React, { useState } from 'react';
import { Box,  } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: '100vh',
          padding: 0,
          margin: 0,
          paddingTop: '64px', // Add space for navbar
          '@media (max-width: 600px)': {
            marginLeft: 0,
            width: '100%',
            paddingTop: '56px', // Smaller navbar height on mobile
          },
        }}
      >
        <Box sx={{ padding: 0, margin: 0, height: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
