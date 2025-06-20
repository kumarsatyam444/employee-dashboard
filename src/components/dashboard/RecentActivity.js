import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import {
  PersonAdd,
  Assignment,
  CheckCircle,
  Schedule,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'employee_added',
      title: 'New Employee Added',
      description: 'Sarah Johnson joined the Design team',
      time: '2 hours ago',
      icon: <PersonAdd />,
      color: 'primary',
    },
    {
      id: 2,
      type: 'task_completed',
      title: 'Task Completed',
      description: 'Performance Review Q4 2023 finished',
      time: '4 hours ago',
      icon: <CheckCircle />,
      color: 'success',
    },
    {
      id: 3,
      type: 'meeting_scheduled',
      title: 'Meeting Scheduled',
      description: 'Team standup meeting for tomorrow',
      time: '6 hours ago',
      icon: <Schedule />,
      color: 'warning',
    },
    {
      id: 4,
      type: 'performance_update',
      title: 'Performance Update',
      description: 'John Doe achieved 95% performance score',
      time: '1 day ago',
      icon: <TrendingUp />,
      color: 'info',
    },
    {
      id: 5,
      type: 'task_assigned',
      title: 'Task Assigned',
      description: 'New project assigned to Development team',
      time: '2 days ago',
      icon: <Assignment />,
      color: 'secondary',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <List>
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `${activity.color}.main` }}>
                      {activity.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2">
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < activities.length - 1 && <Divider variant="inset" component="li" />}
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;
