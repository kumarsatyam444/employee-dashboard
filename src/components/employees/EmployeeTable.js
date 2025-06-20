import React, { useState, } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,

} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Add,
  Download,
} from '@mui/icons-material';
import { mockEmployees } from '../../data/mockData';
import { motion } from 'framer-motion';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view', 'edit', 'add'
  const [formData, setFormData] = useState({});

  const handleMenuClick = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleDialogOpen = (mode, employee = null) => {
    setDialogMode(mode);
    setFormData(employee || {
      name: '',
      email: '',
      position: '',
      department: '',
      salary: '',
      status: 'Active',
    });
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const handleSave = () => {
    if (dialogMode === 'add') {
      const newEmployee = {
        ...formData,
        id: employees.length + 1,
        hireDate: new Date().toISOString().split('T')[0],
        performance: Math.floor(Math.random() * 20) + 80,
        attendance: Math.floor(Math.random() * 10) + 90,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150`,
      };
      setEmployees([...employees, newEmployee]);
    } else if (dialogMode === 'edit') {
      setEmployees(employees.map(emp => 
        emp.id === formData.id ? formData : emp
      ));
    }
    handleDialogClose();
  };

  const handleDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    handleMenuClose();
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.row.avatar} alt={params.row.name} />
      ),
      sortable: false,
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'department', headerName: 'Department', width: 130 },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 120,
      renderCell: (params) => `$${params.value.toLocaleString()}`,
    },
    {
      field: 'performance',
      headerName: 'Performance',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={`${params.value}%`}
          color={params.value >= 90 ? 'success' : params.value >= 80 ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => handleMenuClick(e, params.row)}
          size="small"
        >
          <MoreVert />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Employee Management</Typography>
            <Box>
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => handleDialogOpen('add')}
                sx={{ mr: 1 }}
              >
                Add Employee
              </Button>
              <Button
                startIcon={<Download />}
                variant="outlined"
              >
                Export
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={employees}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDialogOpen('view', selectedEmployee)}>
          <Visibility sx={{ mr: 1 }} /> View
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('edit', selectedEmployee)}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Employee' : 
           dialogMode === 'edit' ? 'Edit Employee' : 'Employee Details'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={dialogMode === 'view'}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData.department || ''}
                  label="Department"
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Human Resources">Human Resources</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary"
                type="number"
                value={formData.salary || ''}
                onChange={(e) => handleInputChange('salary', parseInt(e.target.value))}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={dialogMode === 'view'}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status || 'Active'}
                  label="Status"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSave} variant="contained">
              {dialogMode === 'add' ? 'Add' : 'Save'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default EmployeeTable;
