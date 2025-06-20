import React from 'react';
import { Box, Typography } from '@mui/material';
import AttendanceCalendar from '../components/calendar/AttendanceCalendar';
import { motion } from 'framer-motion';

const Calendar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Attendance & Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track employee attendance, schedule events, and manage leave requests.
        </Typography>
      </Box>

      <AttendanceCalendar />
    </motion.div>
  );
};

export default Calendar;
