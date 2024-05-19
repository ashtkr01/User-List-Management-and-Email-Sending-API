const express = require('express');
const mongoose = require('mongoose');

const userListRoutes = require('./routes/userListRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', userListRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
