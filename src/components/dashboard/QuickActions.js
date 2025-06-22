import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { 

  Assignment, 
  People, 
  CalendarToday,
  Assessment,
 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Employee',
      description: 'Add a new team member',
      icon: People,
      color: 'primary',
      action: () => navigate('/employees'),
    },
    {
      title: 'Create Task',
      description: 'Assign a new task',
      icon: Assignment,
      color: 'secondary',
      action: () => navigate('/tasks'),
    },
    {
      title: 'Schedule Meeting',
      description: 'Plan team meetings',
      icon: CalendarToday,
      color: 'success',
      action: () => navigate('/calendar'),
    },
    {
      title: 'View Reports',
      description: 'Check analytics',
      icon: Assessment,
      color: 'warning',
      action: () => navigate('/analytics'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="custom-card">
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {actions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<action.icon />}
                  onClick={action.action}
                  sx={{
                    justifyContent: 'flex-start',
                    p: 2,
                    height: 'auto',
                    textAlign: 'left',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {action.description}
                    </Typography>
                  </Box>
                </Button>
              </motion.div>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
