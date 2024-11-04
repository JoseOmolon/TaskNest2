import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudIcon from '@mui/icons-material/Cloud';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NoteIcon from '@mui/icons-material/Note';
import TaskIcon from '@mui/icons-material/Task';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import avatarPhoto from '../../img/avatarPhoto.png';
import NataliaLogo from '../../img/JoseLogo.png';
import DashboardContent from './Dashboard';
import Notepad from '../components/Notepad';
import Calendar from '../components/Calendar';
import Weather from '../components/Weather';
import Email from '../components/Email';
import Stocks from '../components/Stocks';
import TodoList from '../components/TodoList';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 320;

// Define the DrawerHeader component
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const SideNav = () => {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // For handling navigation

  // New media query for screen width
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleModeToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Weather', icon: <CloudIcon />, path: '/weather' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Stocks', icon: <ShowChartIcon />, path: '/stocks' },
    { text: 'Notepad', icon: <NoteIcon />, path: '/notepad' },
    { text: 'Todo', icon: <TaskIcon />, path: '/todo' },
    { text: 'Email', icon: <MailIcon />, path: '/email' },
  ];

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === 'light'
        ? {
            background: { default: '#F0F2F5', paper: '#fff' },
          }
        : {
            background: { default: '#2A4364', paper: '#333' },
          }),
    },
  });

  // Effect to collapse drawer on small screens
  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ backgroundColor: mode === 'light' ? '#4267B2' : '#333' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            TaskNest DashApp
            </Typography>

            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleModeToggle}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            <IconButton color="inherit" onClick={handleAvatarClick}>
              <Avatar src={avatarPhoto} sx={{ width: 50, height: 50 }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: mode === 'light' ? '#F0F2F5' : '#2C2C2C',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <img
              src={NataliaLogo}
              alt="Logo"
              style={{
                maxHeight: '50px',
                marginRight: 'auto',
              }}
            />
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }} />
          <Box sx={{ textAlign: 'center', padding: 2 }}>
            <Avatar sx={{ width: 150, height: 150, margin: 'auto' }} src={avatarPhoto} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              Jane Doe
            </Typography>
          </Box>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.text} sx={{ marginLeft: 2 }} onClick={() => handleNavClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/notepad" element={<Notepad />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/email" element={<Email />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/todo" element={<TodoList />} />
            {/* Add other routes as needed */}
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );

  
};

export default SideNav;
