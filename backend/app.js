const healthCheckRoutes = require('./routes/healthCheck');
const cors = require('cors');

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

app.use('/api/health-check', healthCheckRoutes); 