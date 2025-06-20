import React from 'react';
import { Box, Typography } from '@mui/material';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { motion } from 'framer-motion';

const Tasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Task Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Organize and track tasks across different stages of completion.
        </Typography>
      </Box>

      <KanbanBoard />
    </motion.div>
  );
};

export default Tasks;
