import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { Edit, Delete, CheckCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const TodoList = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? { text: taskInput.trim(), finished: task.finished } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, { text: taskInput.trim(), finished: false }]);
      }
      setTaskInput('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditingIndex(index);
  };

  const toggleTaskFinished = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, finished: !task.finished } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, textAlign: 'center', color: theme.palette.primary.main }}
      >
        Todo List
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Add a new task"
          fullWidth
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </Button>
      </Box>
      <Divider />
      <List>
        {tasks.length === 0 ? (
          <ListItem>
            <ListItemText primary="No tasks available" sx={{ textAlign: 'center' }} />
          </ListItem>
        ) : (
          tasks.map((task, index) => (
            <ListItem key={index} sx={{ padding: '10px 0' }}>
              <CheckCircle
                sx={{
                  color: task.finished ? theme.palette.success.main : theme.palette.grey[400],
                  marginRight: 2,
                  cursor: 'pointer',
                }}
                onClick={() => toggleTaskFinished(index)}
              />
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: task.finished ? 'line-through' : 'none',
                      color: task.finished ? theme.palette.text.secondary : theme.palette.text.primary,
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleTaskFinished(index)}
                  >
                    {task.text}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEditTask(index)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                  <Delete color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default TodoList;
