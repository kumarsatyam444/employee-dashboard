import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Grid,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Notifications,
  Security,
  Palette,
  Business,
  Person,
  Save,
  CloudUpload,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    autoSave: true,
    soundEnabled: true,
    compactView: false,
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Your Company',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    website: 'www.yourcompany.com',
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Employee', status: 'Inactive' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Employee',
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked,
    });
  };

  const handleCompanyInfoChange = (field) => (event) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: event.target.value,
    });
  };

  const handleSaveSettings = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddUser = () => {
    const user = {
      id: Date.now(),
      ...newUser,
      status: 'Active',
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'Employee' });
    setOpenUserDialog(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Customize your dashboard preferences and manage system settings.
        </Typography>
      </Box>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<Person />} label="Profile" />
          <Tab icon={<Business />} label="Company" />
          <Tab icon={<Palette />} label="Appearance" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<Security />} label="Users & Security" />
        </Tabs>

        {/* Profile Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2, fontSize: '3rem' }}
                  >
                    A
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Admin User
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    System Administrator
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    sx={{ mt: 2 }}
                  >
                    Upload Photo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        defaultValue="Admin"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        defaultValue="User"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email Address"
                        defaultValue="admin@company.com"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        defaultValue="+1 (555) 123-4567"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Department"
                        defaultValue="Administration"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSaveSettings}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Company Tab */}
        <TabPanel value={activeTab} index={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Company Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company Name"
                    value={companyInfo.name}
                    onChange={handleCompanyInfoChange('name')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Website"
                    value={companyInfo.website}
                    onChange={handleCompanyInfoChange('website')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    value={companyInfo.email}
                    onChange={handleCompanyInfoChange('email')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    value={companyInfo.phone}
                    onChange={handleCompanyInfoChange('phone')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    value={companyInfo.address}
                    onChange={handleCompanyInfoChange('address')}
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveSettings}
                  >
                    Save Company Info
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Appearance Tab */}
        <TabPanel value={activeTab} index={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Theme & Display
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
                  label="Dark Mode"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.compactView}
                      onChange={handleSettingChange('compactView')}
                    />
                  }
                  label="Compact View"
                />
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Language & Region
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select defaultValue="en" label="Language">
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Timezone</InputLabel>
                      <Select defaultValue="utc-5" label="Timezone">
                        <MenuItem value="utc-5">UTC-5 (Eastern)</MenuItem>
                        <MenuItem value="utc-6">UTC-6 (Central)</MenuItem>
                        <MenuItem value="utc-8">UTC-8 (Pacific)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={activeTab} index={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications}
                      onChange={handleSettingChange('notifications')}
                    />
                  }
                  label="Enable Desktop Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailAlerts}
                      onChange={handleSettingChange('emailAlerts')}
                    />
                  }
                  label="Email Alerts"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.soundEnabled}
                      onChange={handleSettingChange('soundEnabled')}
                    />
                  }
                  label="Sound Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoSave}
                      onChange={handleSettingChange('autoSave')}
                    />
                  }
                  label="Auto Save Changes"
                />
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Email Frequency
                </Typography>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Frequency</InputLabel>
                  <Select defaultValue="daily" label="Frequency">
                    <MenuItem value="realtime">Real-time</MenuItem>
                    <MenuItem value="daily">Daily Digest</MenuItem>
                    <MenuItem value="weekly">Weekly Summary</MenuItem>
                    <MenuItem value="never">Never</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Users & Security Tab */}
        <TabPanel value={activeTab} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">User Management</Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setOpenUserDialog(true)}
                    >
                      Add User
                    </Button>
                  </Box>
                  <List>
                    {users.map((user) => (
                      <ListItem key={user.id} divider>
                        <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <Box>
                              <Typography variant="body2">{user.email}</Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip label={user.role} size="small" />
                                <Chip
                                  label={user.status}
                                  size="small"
                                  color={user.status === 'Active' ? 'success' : 'default'}
                                />
                              </Box>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" sx={{ mr: 1 }}>
                            <Edit />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Security Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                      Change Password
                    </Button>
                    <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                      View Login History
                    </Button>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Session Management
                    </Typography>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel>Session Timeout</InputLabel>
                      <Select defaultValue="30" label="Session Timeout">
                        <MenuItem value="15">15 minutes</MenuItem>
                        <MenuItem value="30">30 minutes</MenuItem>
                        <MenuItem value="60">1 hour</MenuItem>
                        <MenuItem value="240">4 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
            size="large"
          >
            Save All Settings
          </Button>
        </Box>
      </Paper>

      {/* Add User Dialog */}
      <Dialog 
        open={openUserDialog} 
        onClose={() => setOpenUserDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                label="Role"
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default Settings;
