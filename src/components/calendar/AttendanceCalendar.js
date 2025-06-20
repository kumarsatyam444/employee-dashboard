import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/calendar.css';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      type: 'meeting',
    },
    {
      id: 2,
      title: 'John Doe - Sick Leave',
      start: new Date(2024, 0, 16),
      end: new Date(2024, 0, 16),
      type: 'leave',
    },
    {
      id: 3,
      title: 'Project Deadline',
      start: new Date(2024, 0, 20),
      end: new Date(2024, 0, 20),
      type: 'deadline',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    type: 'meeting',
  });

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      title: '',
      start: moment(start).format('YYYY-MM-DDTHH:mm'),
      end: moment(end).format('YYYY-MM-DDTHH:mm'),
      type: 'meeting',
    });
    setOpenDialog(true);
  };

  const handleAddEvent = () => {
    const event = {
      id: Date.now(),
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      type: newEvent.type,
    };
    setEvents([...events, event]);
    setOpenDialog(false);
    setNewEvent({ title: '', start: '', end: '', type: 'meeting' });
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#1976d2';
    switch (event.type) {
      case 'meeting':
        backgroundColor = '#1976d2';
        break;
      case 'leave':
        backgroundColor = '#d32f2f';
        break;
      case 'deadline':
        backgroundColor = '#ed6c02';
        break;
      default:
        backgroundColor = '#1976d2';
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Attendance & Events Calendar</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="Meeting" sx={{ bgcolor: '#1976d2', color: 'white' }} size="small" />
              <Chip label="Leave" sx={{ bgcolor: '#d32f2f', color: 'white' }} size="small" />
              <Chip label="Deadline" sx={{ bgcolor: '#ed6c02', color: 'white' }} size="small" />
            </Box>
          </Box>
          
          <Box sx={{ height: 600 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              selectable
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Start Date & Time"
              type="datetime-local"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="End Date & Time"
              type="datetime-local"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={newEvent.type}
                label="Event Type"
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="leave">Leave</MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default AttendanceCalendar;
