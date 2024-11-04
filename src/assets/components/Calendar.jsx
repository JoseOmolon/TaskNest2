import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // For month view
import timeGridPlugin from '@fullcalendar/timegrid'; // For week and day views
import interactionPlugin from '@fullcalendar/interaction'; // For selectable events
import { Box, Typography } from '@mui/material';

const Calendar = ({ darkMode }) => {
  const [events, setEvents] = useState([
    { title: 'Meeting', date: '2024-10-24' },
    { title: 'Conference', date: '2024-10-25' },
  ]);

  const handleDateClick = (arg) => {
    // Handle date click
    const title = prompt('Enter Event Title:');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: darkMode ? '#1a1a1a' : '#fff', // Dark mode background
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        color: darkMode ? '#ffffff' : '#000000', // Dark mode text color
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: 'bold',
          color: darkMode ? '#ffffff' : '#1877F2', // Change color based on dark mode
        }}
      >
        Calendar
      </Typography>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Include necessary plugins
        initialView="dayGridMonth" // Set initial view
        events={events} // Set events from state
        dateClick={handleDateClick} // Add date click handler
        eventClick={(info) => alert(`Event: ${info.event.title}`)} // Event click handler
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        themeSystem={darkMode ? 'dark' : 'standard'} // Set theme based on dark mode
      />
    </Box>
  );
};

export default Calendar;
