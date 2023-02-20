const mongoose = require('mongoose');
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;