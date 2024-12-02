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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-blue-100 to-blue-300 p-6">
            <h2 className="text-4xl font-extrabold text-teal-700 bg-gray-100 rounded-lg px-8 py-4 shadow-lg mb-8">
                Text to Speech and Summarization
            </h2>

            <textarea
                rows="8"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to summarize and convert to speech"
                className="w-full max-w-4xl p-6 mb-6 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 text-lg"
                style={{ height: "200px" }}
            ></textarea>

            <textarea
                rows="6"
                value={summary}
                readOnly
                placeholder="Summary will appear here..."
                className="w-full max-w-4xl p-6 mb-6 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-green-500 bg-white text-gray-800 text-lg"
                style={{ height: "160px" }}
            ></textarea>

            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={handleSummarize}
                    disabled={isSummarizing}
                    className={`p-4 w-60 rounded-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 transition-all ${
                        isSummarizing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400"
                    }`}
                >
                    {isSummarizing ? "Summarizing..." : "Summarize"}
                </button>

                <button
                    onClick={handleTextToSpeech}
                    disabled={!summary.trim()}
                    className={`p-4 w-60 rounded-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 transition-all ${
                        speaking
                            ? "bg-orange-400 hover:bg-orange-500 focus:ring-orange-300"
                            : summary.trim()
                            ? "bg-green-600 hover:bg-green-700 focus:ring-green-400"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    {speaking ? "Speaking..." : "Speak Summary"}
                </button>

                <button
                    onClick={handleStopAudio}
                    disabled={!speaking}
                    className={`p-4 w-60 rounded-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 transition-all ${
                        speaking
                            ? "bg-red-600 hover:bg-red-700 focus:ring-red-400"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Stop Audio
                </button>
            </div>
        </div>
    );
};

export default TextToSpeechAndSummarize;
