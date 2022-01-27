const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require("cors");
const errorHandler = require('./middleware/error');

const connectDB = require("./config/db");

dotenv.config({ path: './config/config.env' });

connectDB();

// Route files
const vereinsmitglied = require('./routes/Vereinsmitglied');
const konto = require("./routes/Konto")
const app = express();
app.use(cors())
// Body parser
app.use(express.json());
// Mount routers
app.use('/api/v1/vereinsmitglied', vereinsmitglied);
app.use('/api/v1/konto', konto);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});

