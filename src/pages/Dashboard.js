import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import StatsCards from '../components/dashboard/StatsCards';
import PerformanceCharts from '../components/dashboard/PerformanceCharts';
import RecentActivity from '../components/dashboard/RecentActivity';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your team today.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <StatsCards />
      </Box>

      <Box sx={{ mb: 4 }}>
        <PerformanceCharts />
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <RecentActivity />
        </Box>
        <Box sx={{ flex: 1 }}>
          <QuickActions />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
