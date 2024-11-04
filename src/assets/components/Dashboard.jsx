import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MoreVert,
  WbSunny,
  TrendingUp,
  CalendarToday,
  CheckCircle,
  EventAvailable,
  Facebook,
  GitHub,
  LinkedIn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Sample pseudo data
const weatherData = [
  { day: 'Mon', temp: '21°C', condition: 'Sunny' },
  { day: 'Tue', temp: '19°C', condition: 'Partly Cloudy' },
  { day: 'Wed', temp: '22°C', condition: 'Rain' },
  { day: 'Thu', temp: '23°C', condition: 'Sunny' },
  { day: 'Fri', temp: '20°C', condition: 'Cloudy' },
];

const stockData = [
  { name: 'AAPL', price: '$150', change: '+2.5%' },
  { name: 'GOOGL', price: '$2750', change: '-1.2%' },
];

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const funFact = 'Did you know? In Bangladesh, kids as young as 15 can work legally in many jobs.';

const DashboardContent = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#1877F2' }}>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Welcome Tile */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, height: '20rem', marginTop: '10px' }}>
              <CardContent sx={{ position: 'relative', height: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1877F2' }}>
                  Welcome Jane
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1, color: theme.palette.text.secondary }}>
                  Hello! Welcome back! Today is
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  {currentDate}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                  {funFact}
                </Typography>
                <IconButton sx={{ position: 'absolute', right: 8, top: 8 }}>
                  <MoreVert />
                </IconButton>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Weather Tile */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, height: '20rem', marginTop: '10px' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1877F2' }}>
                  <WbSunny sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Weekly Weather Forecast
                </Typography>
                {weatherData.map((day, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{day.day}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
                      {day.temp} ({day.condition})
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Stocks Tile */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, height: '20rem', marginTop: '10px' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1877F2' }}>
                  <TrendingUp sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Stocks
                </Typography>
                {stockData.map((stock, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{stock.name}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: stock.change.startsWith('+') ? 'green' : 'red' }}>
                      {stock.price} ({stock.change})
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Todo List Tile */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, height: '20rem', marginTop: '10px' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1877F2' }}>
                  <CheckCircle sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Todo List
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Tasks for today:</Typography>
                <ul style={{ paddingLeft: '1.5rem', color: theme.palette.text.primary }}>
                  <li>Finish project report</li>
                  <li>Meeting with team</li>
                  <li>Call client for feedback</li>
                  <li>Prepare presentation for next week</li> {/* New Task */}
                  <li>Review project specifications</li> {/* New Task */}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Calendar Tile */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, height: '20rem', marginTop: '10px' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1877F2' }}>
                  <CalendarToday sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Calendar
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ marginBottom: 2, color: theme.palette.text.secondary }}>October 2024</Typography>
                  <Grid container spacing={0.5}>
                    {Array.from({ length: 42 }, (_, index) => {
                      const day = index + 1;
                      return (
                        <Grid item xs={1.7} key={index} sx={{ textAlign: 'center', padding: 1, border: '1px solid #ddd' }}>
                          <Typography variant="body2" sx={{ color: day > 31 ? 'transparent' : theme.palette.text.primary }}>{day > 31 ? '' : day}</Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Upcoming Events Tile */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, height: '20rem', marginTop: '10px' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1877F2' }}>
                  <EventAvailable sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                  Upcoming Events
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Next event on your calendar:</Typography>
                <ul style={{ paddingLeft: '1.5rem', color: theme.palette.text.primary }}>
                  <li>Project deadline: Oct 30</li>
                  <li>Team meeting: Nov 2</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      {/* Footer */}
      <Box
        sx={{
          position: 'fixed', // Keep the position fixed
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          gap: 1,
          backgroundColor: 'transparent',
          color: theme.palette.text.secondary,
          zIndex: 1000,
          display: { xs: 'none', md: 'flex' }, // Hide on extra small and small screens, show on medium and up
        }}
      >
        <Typography variant="body2" sx={{ marginRight: 1 }} fontSize="medium">
          2024 © <a href="https://bobchopgaming.github.io/myprofile.io/" target="_blank">Jose.O Web Solutions</a><b> |</b>
        </Typography>
        <IconButton href="https://www.linkedin.com/feed/" target="_blank" aria-label="LinkedIn">
          <LinkedIn fontSize="medium" />
        </IconButton>
        <IconButton href="https://www.facebook.com/bobchopgaming565" target="_blank" aria-label="Facebook">
          <Facebook fontSize="medium" />
        </IconButton>
        <IconButton href="https://github.com/BobchopGaming" target="_blank" aria-label="GitHub">
          <GitHub fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
    
  );
};


export default DashboardContent;
