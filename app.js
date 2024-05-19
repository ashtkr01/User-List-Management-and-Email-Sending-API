const express = require('express');
const mongoose = require('mongoose');


const {connectQueue} = require("./config/queue-config");
const { subscribeMessage } = require("./config/queue-config");


const userListRoutes = require('./routes/userListRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', userListRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, async() => {
        await connectQueue();
        subscribeMessage();
        console.log(`Server running on port ${PORT}`);
    }))
    .catch(err => console.error(err));
