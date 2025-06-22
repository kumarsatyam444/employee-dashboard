import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Avatar,
  Toolbar,
} from '@mui/material';
import {
  Dashboard,
  People,
  CalendarToday,
  Assignment,
  Settings,
  Business,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Employees', icon: <People />, path: '/employees' },
  { text: 'Calendar', icon: <CalendarToday />, path: '/calendar' },
  { text: 'Tasks', icon: <Assignment />, path: '/tasks' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          border: 'none',
          borderRight: 'none',
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <Business />
        </Avatar>
        <Typography variant="h6" noWrap>
          HR Dashboard
        </Typography>
      </Box>
      
      <List sx={{ padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ margin: 0 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                margin: 0,
                padding: '12px 16px',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
