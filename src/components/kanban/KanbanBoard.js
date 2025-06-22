import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Design new dashboard',
          description: 'Create wireframes and mockups',
          assignee: 'John Doe',
          priority: 'High',
          dueDate: '2024-01-20',
        },
        {
          id: '2',
          title: 'Update employee records',
          description: 'Review and update all employee information',
          assignee: 'Jane Smith',
          priority: 'Medium',
          dueDate: '2024-01-25',
        },
      ],
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Implement authentication',
          description: 'Add login and registration functionality',
          assignee: 'Mike Johnson',
          priority: 'High',
          dueDate: '2024-01-18',
        },
      ],
    },
    review: {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: '4',
          title: 'Code review for API endpoints',
          description: 'Review REST API implementation',
          assignee: 'Sarah Wilson',
          priority: 'Medium',
          dueDate: '2024-01-22',
        },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Setup project structure',
          description: 'Initialize React project with required dependencies',
          assignee: 'John Doe',
          priority: 'Low',
          dueDate: '2024-01-15',
        },
      ],
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium',
    dueDate: '',
    columnId: 'todo',
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (sourceColumn === destColumn) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destColumn.id]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
  };

  const handleAddTask = () => {
    const task = {
      id: Date.now().toString(),
      ...newTask,
    };

    const column = columns[newTask.columnId];
    const newColumn = {
      ...column,
      tasks: [...column.tasks, task],
    };

    setColumns({
      ...columns,
      [newColumn.id]: newColumn,
    });

    setOpenDialog(false);
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      priority: 'Medium',
      dueDate: '',
      columnId: 'todo',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Task Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
          {Object.values(columns).map((column) => (
            <Box key={column.id} sx={{ minWidth: 300, maxWidth: 300 }}>
              <Card sx={{ bgcolor: 'grey.50', mb: 2 }}>
                <CardContent sx={{ pb: '16px !important' }}>
                  <Typography variant="h6" gutterBottom>
                    {column.title}
                    <Chip
                      label={column.tasks.length}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </CardContent>
              </Card>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: 500,
                      bgcolor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
                      borderRadius: 1,
                      p: 1,
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card
                              sx={{
                                mb: 2,
                                cursor: 'grab',
                                transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                                boxShadow: snapshot.isDragging ? 4 : 1,
                              }}
                            >
                              <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {task.title}
                                  </Typography>
                                  <Chip
                                    label={task.priority}
                                    size="small"
                                    color={getPriorityColor(task.priority)}
                                  />
                                </Box>
                                
                                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {task.description}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                      {task.assignee.charAt(0)}
                                    </Avatar>
                                    <Typography variant="caption">
                                      {task.assignee}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" color="text.secondary">
                                    {task.dueDate}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newTask.priority}
                label="Priority"
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Column</InputLabel>
              <Select
                value={newTask.columnId}
                label="Column"
                onChange={(e) => setNewTask({ ...newTask, columnId: e.target.value })}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inprogress">In Progress</MenuItem>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default KanbanBoard;
