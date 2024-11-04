import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud'; 
import WbSunnyIcon from '@mui/icons-material/WbSunny'; 
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { format } from 'date-fns';

const WeatherApp = () => {
  const theme = useTheme(); // Access the theme
  const [city, setCity] = useState('Berlin');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  
  const apiKey = 'e9d0894878d7839e7ee86b14a4a20094';

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (weather) => {
    const icon = weather[0].main.toLowerCase();
    switch (icon) {
      case 'clear':
        return <WbSunnyIcon sx={{ color: '#FFEB3B' }} />; // Yellow color
      case 'clouds':
        return <CloudIcon sx={{ color: theme.palette.grey[500] }} />;
      case 'snow':
        return <AcUnitIcon sx={{ color: theme.palette.primary.main }} />;
      case 'rain':
        return <CloudIcon sx={{ color: theme.palette.primary.main }} />;
      default:
        return <CloudIcon sx={{ color: theme.palette.grey[500] }} />;
    }
  };
  

  return (
    <Box 
      sx={{ 
        padding: 3, 
        maxWidth: 600, 
        margin: 'auto', 
        textAlign: 'left', 
        backgroundColor: theme.palette.background.paper, 
        borderRadius: '12px', 
        boxShadow: theme.shadows[3] 
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
        Weather App
      </Typography>

      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        sx={{ backgroundColor: theme.palette.background.default }} // Match input with theme
      />
      <Button 
        variant="contained" 
        onClick={handleSearch} 
        sx={{ marginTop: 2, backgroundColor: theme.palette.primary.main }}
      >
        Search
      </Button>

      {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

      {weatherData && (
        <Box sx={{ marginTop: 3, borderRadius: '8px', padding: 2, backgroundColor: theme.palette.background.default }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getWeatherIcon(weatherData.weather)}
            <Typography variant="h2" sx={{ marginLeft: 2, color: theme.palette.text.primary }}>
              {Math.round(weatherData.main.temp)}°
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ marginTop: 1 }}>{weatherData.weather[0].description}</Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>{weatherData.name}, {weatherData.sys.country}</Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Typography variant="body2">Humidity: {weatherData.main.humidity}%</Typography>
            <Typography variant="body2">Feels like: {Math.round(weatherData.main.feels_like)}°</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Air pressure: {weatherData.main.pressure} hPa</Typography>
            <Typography variant="body2">Wind speed: {weatherData.wind.speed} km/h</Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {format(new Date(), 'dd.MM')} {format(new Date(), 'HH:mm')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeatherApp;
