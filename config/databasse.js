
const mongoose = require('mongoose');

require('dotenv').config();

// Replace 'your_mongodb_url' with your actual MongoDB connection string
const dbConnect = () => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4, // Force IPv4
    })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => { 
        console.log('Issue in Db connection');
        console.error(error.message);
        process.exit(1);
    })

}

module.exports = dbConnect;

