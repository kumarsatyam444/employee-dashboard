import React from 'react';
import { Box, Typography } from '@mui/material';
import EmployeeTable from '../components/employees/EmployeeTable';
import { motion } from 'framer-motion';

const Employees = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your team members, track performance, and handle HR operations.
        </Typography>
      </Box>

      <EmployeeTable />
    </motion.div>
  );
};

export default Employees;
