require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // File upload handling
const fs = require('fs'); // To handle file operations
const path = require('path'); // To manage file paths

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173'];

// Configure CORS
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'sankalp' })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path where audio files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as file name
    }
});

const upload = multer({ storage });

// Audio Summary Route
app.post('/api/audio-summary', upload.single('audio'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    const audioPath = req.file.path;

    try {
        // Placeholder: Simulate audio-to-text conversion (replace with actual logic)
        const transcribedText = await simulateAudioToTextConversion(audioPath);

        // Placeholder: Simulate text summarization (replace with actual logic)
        const summary = simulateTextSummarization(transcribedText);

        // Clean up the uploaded file after processing
        fs.unlinkSync(audioPath);

        return res.json({ summary });
    } catch (error) {
        console.error('Error during audio processing:', error);
        res.status(500).json({ error: 'Failed to process audio.' });
    }
});

// Mock functions for transcription and summarization
async function simulateAudioToTextConversion(audioPath) {
    // Simulate transcription logic here, e.g., using Google Cloud Speech-to-Text or similar service
    // For now, return a mocked transcription
    return "This is a placeholder transcription of the audio content. It will be replaced by actual transcription logic.";
}

function simulateTextSummarization(text) {
    // Placeholder: Summarize the transcription (you can use libraries like OpenAI API for actual summarization)
    return text.slice(0, 100) + "..."; // Return first 100 characters as a mock summary
}

// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
