const express = require('express');
const cors = require('cors'); // Import CORS middleware
const path = require('path');
const { initDb } = require('./db/init');

const app = express();
const stemsRoutes = require('./routes/stems');
const bandRoutes = require('./routes/band');

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Initialize the database
initDb();

// Serve stems as static files
app.use('/stems', express.static(path.join(__dirname, 'data/stems')));

// API routes
app.use('/api', stemsRoutes);
app.use('/api', bandRoutes);

// Start the server
const PORT = process.env.PORT || 5053;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});