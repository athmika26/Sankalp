import { useState } from "react";
import axios from "axios";
import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: "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", // Replace with your actual Groq API key
    dangerouslyAllowBrowser: true,
});

const AudioToTextAndSummarize = () => {
    const [value, setValue] = useState("Upload an audio file or provide a URL to get transcription and summary...");
    const [isUploading, setIsUploading] = useState(false);
    const [audioSrc, setAudioSrc] = useState(null);
    const [audioUrl, setAudioUrl] = useState("");
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
        if (!audioSrc && !audioUrl) {
            alert("Please upload an audio file or enter a URL.");
            return;
        }

        setIsUploading(true);
        setValue("Uploading file and transcribing...");
        try {
            let transcript;
            if (audioUrl) {
                transcript = await transcribeFromUrl(audioUrl);
            } else {
                const response = await fetch(audioSrc);
                const blob = await response.blob();
                transcript = await transcribeAudio(blob);
            }
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
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <textarea
                value={value}
                readOnly
                style={{
                    width: "100%",
                    height: "100px",
                    marginBottom: "10px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />
            <br />
            <textarea
                value={summary}
                readOnly
                placeholder="Summary will appear here..."
                style={{
                    width: "100%",
                    height: "100px",
                    marginBottom: "10px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />
            <br />
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />
            <br />
            <input
                type="text"
                placeholder="Enter audio URL"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                disabled={isUploading}
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />
            <br />
            {audioSrc && (
                <audio
                    controls
                    src={audioSrc}
                    style={{
                        marginBottom: "10px",
                        width: "100%",
                        borderRadius: "5px",
                    }}
                />
            )}
            <button
                onClick={handleTranscribe}
                disabled={isUploading}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: isUploading ? "#ccc" : "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: isUploading ? "not-allowed" : "pointer",
                }}
            >
                {isUploading ? "Processing..." : "Transcribe & Summarize"}
            </button>
        </div>
    );
};

export default AudioToTextAndSummarize;
