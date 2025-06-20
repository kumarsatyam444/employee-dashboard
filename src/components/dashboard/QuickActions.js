import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
 
  Avatar,
} from '@mui/material';
import {
  PersonAdd,
  Assignment,
  CalendarToday,
  Assessment,
  FileDownload,
  Notifications,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add Employee',
      description: 'Add new team member',
      icon: <PersonAdd />,
      color: 'primary',
      action: () => console.log('Add Employee'),
    },
    {
      title: 'Create Task',
      description: 'Assign new task',
      icon: <Assignment />,
      color: 'secondary',
      action: () => console.log('Create Task'),
    },
    {
      title: 'Schedule Meeting',
      description: 'Book meeting room',
      icon: <CalendarToday />,
      color: 'info',
      action: () => console.log('Schedule Meeting'),
    },
    {
      title: 'Generate Report',
      description: 'Create performance report',
      icon: <Assessment />,
      color: 'success',
      action: () => console.log('Generate Report'),
    },
    {
      title: 'Export Data',
      description: 'Download employee data',
      icon: <FileDownload />,
      color: 'warning',
      action: () => console.log('Export Data'),
    },
    {
      title: 'Send Notification',
      description: 'Notify all employees',
      icon: <Notifications />,
      color: 'error',
      action: () => console.log('Send Notification'),
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
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {actions.map((action, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={action.action}
                    sx={{
                      p: 2,
                      height: 'auto',
                      flexDirection: 'column',
                      gap: 1,
                      textTransform: 'none',
                      minHeight: 120,
                    }}
                  >
                    <Avatar sx={{ bgcolor: `${action.color}.main`, mb: 1 }}>
                      {action.icon}
                    </Avatar>
                    <Typography variant="subtitle2" textAlign="center">
                      {action.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" textAlign="center">
                      {action.description}
                    </Typography>
                  </Button>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
