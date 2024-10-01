const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Create a Schema for Criminals
const criminalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 4,
        maxlength: 30
    },
    latitude: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 50
    },
    longitude: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 50
    }
});

// Create the Criminal model
const Criminal = mongoose.model('Criminal', criminalSchema);

module.exports = {
    Criminal
};