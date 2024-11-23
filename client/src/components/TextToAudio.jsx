import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { Groq } from "groq-sdk";

const groq = new Groq({
    apiKey: "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", // Replace with your actual Groq API key
    dangerouslyAllowBrowser: true,
});

const TextToSpeechAndSummarize = () => {
    const [inputText, setInputText] = useState("");
    const [summary, setSummary] = useState("");
    const [isSummarizing, setIsSummarizing] = useState(false);
    const { speak, cancel, speaking } = useSpeechSynthesis();

    const handleSummarize = async () => {
        if (!inputText.trim()) {
            alert("Please enter text to summarize.");
            return;
        }

        setIsSummarizing(true);
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Summarize the following text concisely:\n\n${inputText}`,
                    },
                ],
                model: "mixtral-8x7b-32768", // Replace with the specific model you're using
            });

            const response = chatCompletion.choices[0]?.message?.content;
            setSummary(response || "Summary not available.");
        } catch (error) {
            console.error("Error summarizing text:", error);
            alert("Failed to summarize the text. Please try again.");
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleTextToSpeech = () => {
        if (!summary.trim()) {
            alert("No summary available to speak. Please summarize the text first.");
            return;
        }
        speak({ text: summary });
    };

    const handleStopAudio = () => {
        cancel();
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Text to Speech and Summarization</h2>

            {/* Input Text Area */}
            <textarea
                rows="6"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to summarize and convert to speech"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            ></textarea>

            {/* Summary Text Area */}
            <textarea
                rows="4"
                value={summary}
                readOnly
                placeholder="Summary will appear here..."
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            ></textarea>

            {/* Buttons */}
            <div style={{ marginBottom: "10px" }}>
                <button
                    onClick={handleSummarize}
                    disabled={isSummarizing}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        backgroundColor: isSummarizing ? "#ccc" : "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: isSummarizing ? "not-allowed" : "pointer",
                    }}
                >
                    {isSummarizing ? "Summarizing..." : "Summarize"}
                </button>

                <button
                    onClick={handleTextToSpeech}
                    disabled={!summary.trim()}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        backgroundColor: speaking ? "orange" : "#28A745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: summary.trim() ? "pointer" : "not-allowed",
                    }}
                >
                    {speaking ? "Speaking..." : "Speak Summary"}
                </button>

                <button
                    onClick={handleStopAudio}
                    disabled={!speaking}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#DC3545",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: speaking ? "pointer" : "not-allowed",
                    }}
                >
                    Stop Audio
                </button>
            </div>
        </div>
    );
};

export default TextToSpeechAndSummarize;
