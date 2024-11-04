import React from 'react';
import { Box, Typography, TextField, useTheme } from '@mui/material';

const Notepad = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100vh',
        padding: 3,
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5', // Dark or light background
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        }}
      >
        Notepad
      </Typography>

      {/* Notepad input */}
      <TextField
        multiline
        fullWidth
        rows={18}
        placeholder="Start writing your notes here..."
        variant="standard"
        InputProps={{
          sx: {
            color: theme.palette.text.primary, // Text color based on theme
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : 'white', // Background color based on theme
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            padding: 2,
            fontFamily: 'Arial',
          },
        }}
      />
    </Box>
  );
};

export default Notepad;
