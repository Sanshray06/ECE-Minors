const express = require('express');
const cors = require('cors');
const zod = require('zod');
const { Criminal } = require('./db'); // Ensure correct path

const app = express();

app.use(cors());
app.use(express.json()); // Required for parsing application/json

// Zod schema for input validation
const signupBody = zod.object({
    username: zod.string().min(4),
    longitude: zod.number(),  // Expecting latitude and longitude as numbers
    latitude: zod.number()
});

app.post('/add', async (req, res) => {
    console.log('Request body:', req.body); // Log incoming request for debugging

    const validationResult = signupBody.safeParse(req.body);
    
    if (!validationResult.success) {
        console.log('Validation failed:', validationResult.error.errors);
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResult.error.errors // Return detailed error messages
        });
    }
    
    // Check if the username already exists
    const existingUser = await Criminal.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
    }
    
    // Check if latitude and longitude are already used by another user
    const existingCoordinates = await Criminal.findOne({ 
        latitude: req.body.latitude, 
        longitude: req.body.longitude 
    });
    if (existingCoordinates) {
        return res.status(409).json({ message: "Coordinates already exist" });
    }

    try {
        // Create a new user if validation passes and no duplicates found
        const user = await Criminal.create({
            username: req.body.username,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
