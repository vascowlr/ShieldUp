const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const reportRoutes = require('./src/routes/reportRoutes');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('ShieldUp API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
