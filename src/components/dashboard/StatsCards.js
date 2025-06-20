import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { People, TrendingUp, CalendarToday, Assignment } from '@mui/icons-material';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
            {trend && (
              <Typography variant="body2" sx={{ color: trend > 0 ? 'success.main' : 'error.main' }}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </Typography>
            )}
          </Box>
          <Avatar sx={{ backgroundColor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '1,234',
      icon: <People />,
      color: '#1976d2',
      trend: 12,
    },
    {
      title: 'Average Performance',
      value: '87%',
      icon: <TrendingUp />,
      color: '#2e7d32',
      trend: 5,
    },
    {
      title: 'Attendance Rate',
      value: '94%',
      icon: <CalendarToday />,
      color: '#ed6c02',
      trend: -2,
    },
    {
      title: 'Active Tasks',
      value: '156',
      icon: <Assignment />,
      color: '#9c27b0',
      trend: 8,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatsCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
