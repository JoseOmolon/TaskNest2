import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  List, 
  ListItem, 
  Paper, 
  CircularProgress, 
  Divider, 
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

// API URLs
const trendingApiUrl = 'https://finnhub.io/api/v1/news?category=general&token=c34391qad3i8edlcgrgg';
const searchApiUrl = 'https://finnhub.io/api/v1/search?q=';
const stockApiUrl = 'https://finnhub.io/api/v1/quote?symbol=';

const StockMarket = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const theme = useTheme();

  // Fetch trending stocks
  useEffect(() => {
    const fetchTrendingStocks = async () => {
      try {
        const response = await axios.get(trendingApiUrl);
        if (response.data) {
          setTrendingStocks(response.data.slice(0, 5)); // Show top 5 trending stocks
        }
      } catch (error) {
        console.error('Error fetching trending stocks:', error);
      }
    };

    fetchTrendingStocks();
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Predictive search for stocks
  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query.length > 2) {
      setSearching(true);
      try {
        const response = await axios.get(`${searchApiUrl}${query}&token=c34391qad3i8edlcgrgg`);
        if (response.data.result) {
          setSearchResults(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  // Fetch stock data
  const fetchStockData = async (symbol) => {
    setLoading(true);
    try {
      const response = await axios.get(`${stockApiUrl}${symbol}&token=c34391qad3i8edlcgrgg`);
      if (response.data && response.data.c) {
        setSelectedStock(symbol);
        setStockData(response.data);
      } else {
        console.error('No valid stock data received.');
        setSelectedStock(null);
        setStockData(null);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setSelectedStock(null);
      setStockData(null);
    }
    setLoading(false);
  };

  // Stock price chart data
  const stockChartData = {
    labels: ['Open', 'High', 'Low', 'Close'],
    datasets: [
      {
        label: 'Stock Price',
        data: stockData ? [stockData.o, stockData.h, stockData.l, stockData.c] : [],
        fill: true,
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: 'rgba(33, 150, 243, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '800px', margin: 'auto' }}>
      {/* Heading */}
      <Typography variant="h4" sx={{ marginBottom: 3, color: theme.palette.primary.main }}>
        Stock Market Dashboard
      </Typography>

      {/* Search Input with Predictive Search */}
      <Box position="relative" ref={searchInputRef}>
        <TextField
          label="Search Stocks"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {searching && (
          <CircularProgress size={24} sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }} />
        )}
        {searchResults.length > 0 && (
          <Paper
            ref={searchDropdownRef}
            elevation={3}
            sx={{
              maxHeight: '200px',
              overflowY: 'auto',
              marginBottom: 2,
              position: 'absolute',
              width: '100%',
              zIndex: 1,
            }}
          >
            <List>
              {searchResults.map((stock) => (
                <ListItem
                  key={stock.symbol}
                  button
                  onClick={() => fetchStockData(stock.symbol)}
                  sx={{ padding: '10px 20px', '&:hover': { backgroundColor: theme.palette.action.hover } }}
                >
                  <Typography variant="body1">{stock.description} ({stock.symbol})</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {/* Display Selected Stock Data */}
      {selectedStock && (
        <Card sx={{ marginTop: 4, boxShadow: 6 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://source.unsplash.com/1600x900/?stock,market"
            alt="Stock Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedStock} Stock Information
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <CircularProgress />
              </Box>
            ) : stockData ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>Open: {stockData.o}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>High: {stockData.h}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>Low: {stockData.l}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>Current: {stockData.c}</Typography>

                {/* Stock Chart */}
                <Box sx={{ width: '100%', marginTop: 3 }}>
                  <Line data={stockChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </Box>
              </Box>
            ) : (
              <Typography variant="body1">No stock data available.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Divider sx={{ marginY: 3 }} />

      {/* Trending Stocks */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Top 5 Trending Stocks
      </Typography>
      <List>
        {trendingStocks.map((stock, index) => (
          <ListItem
            key={index}
            button
            onClick={() => fetchStockData(stock.symbol)}
            sx={{ padding: '10px 20px', '&:hover': { backgroundColor: theme.palette.action.hover } }}
          >
            <Typography variant="body2">{stock.headline}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StockMarket;
