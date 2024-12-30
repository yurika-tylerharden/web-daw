const express = require('express');
const cors = require('cors'); // Import CORS middleware
const { initDb } = require('./db/init');

const app = express();
const stemsRoutes = require('./routes/stems');

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Initialize the database
initDb();

// API routes
app.use('/api', stemsRoutes);

// Start the server
const PORT = process.env.PORT || 5053;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
