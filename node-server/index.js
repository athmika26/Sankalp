require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // For Hugging Face API calls

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173'];

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure CORS
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { dbName: 'sankalp' })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Audio Summary Route
app.post('/api/audio-text', upload.single('audio'), async (req, res) => {
    let audioPath;

    if (req.file) {
        // File upload case
        audioPath = req.file.path;
    } else if (req.body.audioURL) {
        // URL case
        audioPath = req.body.audioURL;
    } else {
        return res.status(400).json({ error: 'No audio file or URL provided.' });
    }

    try {
        // Step 1: Perform Audio-to-Text Transcription (using local file or URL)
        console.log(audioPath);
        const transcribedText = await performAudioTranscription(audioPath);
        console.log(transcribedText);
        // Step 2: Perform Text Summarization
        //const summary = await summarizeText(transcribedText);
        console.log(summary);
        if (req.file) fs.unlinkSync(audioPath); // Clean up uploaded file if applicable

        return res.json({ transcription: transcribedText, summary });
    } catch (error) {
        console.error('Error during audio processing:', error);
        res.status(500).json({ error: 'Failed to process audio.' });
    }
});

// Function to perform audio transcription
async function performAudioTranscription(audioPath) {
    try {
        // Replace with real transcription logic or API
        return "Transcribed text from audio file."; // Placeholder response
    } catch (error) {
        console.error('Error in transcription:', error);
        throw new Error('Audio transcription failed.');
    }
}

// Function to summarize text using Hugging Face API
async function summarizeText(text) {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: text },
            {
                headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}` },
            }
        );

        if (response.data && response.data[0]) {
            return response.data[0].summary_text;
        }
        return "Summarization failed."; // Fallback message
    } catch (error) {
        console.error('Error in summarization:', error);
        throw new Error('Text summarization failed.');
    }
}
// app.post("/api/summarize", async (req, res) => {
//     const { text } = req.body;

//     if (!text) {
//         return res.status(400).json({ error: "Text is required for summarization." });
//     }

//     try {
//         // Replace with Groq API details
//         const groqResponse = await axios.post(
//             "https://api.groq.com/v1/summarize", // Replace with Groq's summarization endpoint
//             { text }, // Assuming Groq expects a `text` field in the payload
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // Replace with your Groq API key
//                 },
//             }
//         );

//         const summary = groqResponse.data.summary; // Adjust based on Groq's response structure
//         res.status(200).json({ summary });
//     } catch (error) {
//         console.error("Error summarizing text:", error);
//         res.status(500).json({ error: "Failed to summarize the text. Please try again." });
//     }
// });
// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
