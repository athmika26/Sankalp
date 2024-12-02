import { useState } from "react";
import axios from "axios";
import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: "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", // Replace with your actual Groq API key
    dangerouslyAllowBrowser: true,
});

const AudioToTextAndSummarize = () => {
    const [value, setValue] = useState("Upload an audio file to get transcription and summary...");
    const [isUploading, setIsUploading] = useState(false);
    const [audioSrc, setAudioSrc] = useState(null);
    const [summary, setSummary] = useState("");
    const key = "91567481288444c29f8a9f4b8f2ca017"; // AssemblyAI Key

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "audio/wav" || file.type === "audio/mpeg")) {
            setAudioSrc(URL.createObjectURL(file));
            setValue("File ready for transcription. Click 'Transcribe' to proceed.");
        } else {
            alert("Please upload a valid audio file (wav or mp3).");
        }
    };

    const handleTranscribe = async () => {
        if (!audioSrc) {
            alert("Please upload an audio file.");
            return;
        }

        setIsUploading(true);
        setValue("Uploading file and transcribing...");
        try {
            const response = await fetch(audioSrc);
            const blob = await response.blob();
            const transcript = await transcribeAudio(blob);

            setValue(transcript || "No transcription available.");
            if (transcript) {
                const summarizedText = await summarizeText(transcript);
                setSummary(summarizedText || "Summary not available.");
            }
        } catch (error) {
            console.error("Error:", error);
            setValue("Error during transcription or summarization. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const transcribeAudio = async (file) => {
        const uploadResponse = await axios.post(
            "https://api.assemblyai.com/v2/upload",
            file,
            {
                headers: {
                    "Content-Type": "application/octet-stream",
                    Authorization: key,
                },
            }
        );

        const uploadUrl = uploadResponse.data.upload_url;
        return await transcribeFromUrl(uploadUrl);
    };

    const transcribeFromUrl = async (url) => {
        const transcriptionResponse = await axios.post(
            "https://api.assemblyai.com/v2/transcript",
            { audio_url: url },
            {
                headers: {
                    Authorization: key,
                },
            }
        );

        const { id } = transcriptionResponse.data;

        while (true) {
            const statusResponse = await axios.get(
                `https://api.assemblyai.com/v2/transcript/${id}`,
                {
                    headers: {
                        Authorization: key,
                    },
                }
            );

            if (statusResponse.data.status === "completed") {
                return statusResponse.data.text;
            } else if (statusResponse.data.status === "failed") {
                throw new Error("Transcription failed.");
            }

            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    };

    const summarizeText = async (text) => {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Summarize the following text concisely:\n\n${text}`,
                    },
                ],
                model: "mixtral-8x7b-32768", // Replace with the specific model you're using
            });

            const response = chatCompletion.choices[0]?.message?.content;
            return response || "Summary not available.";
        } catch (error) {
            console.error("Error summarizing text:", error);
            throw new Error("Failed to summarize the text. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-300 p-6">
            <h2 className="text-4xl font-extrabold text-teal-700 bg-gray-100 rounded-lg px-8 py-4 shadow-lg mb-8">
                Audio Transcription & Summarization
            </h2>

            <textarea
                value={value}
                readOnly
                className="w-full max-w-4xl p-6 mb-6 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 text-lg"
                style={{ height: "200px" }}
            />

            <textarea
                value={summary}
                readOnly
                placeholder="Summary will appear here..."
                className="w-full max-w-4xl p-6 mb-6 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-green-500 bg-white text-gray-800 text-lg"
                style={{ height: "200px" }}
            />

            <label
                htmlFor="audio-upload"
                className="cursor-pointer inline-block p-4 rounded-lg bg-teal-700 text-white font-bold shadow-md hover:bg-teal-800 focus:ring-2 focus:ring-teal-400 transition-all mb-4"
            >
                Choose Audio File
            </label>
            <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
            />

            {audioSrc && (
                <audio
                    controls
                    src={audioSrc}
                    className="mt-4 mb-6 w-full max-w-4xl rounded-lg shadow-md"
                />
            )}

            <button
                onClick={handleTranscribe}
                disabled={isUploading}
                className={`p-4 w-full max-w-4xl rounded-lg ${
                    isUploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                } text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all`}
            >
                {isUploading ? "Processing..." : "Transcribe & Summarize"}
            </button>
        </div>
    );
};

export default AudioToTextAndSummarize;
