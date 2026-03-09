//chat
// require('dotenv').config();
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

//jselga
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.error(err);

    })