// import React, { useState } from 'react';
// import axios from 'axios';

// const AudioToText = () => {
//   const [audioFile, setAudioFile] = useState(null);
//   const [summary, setSummary] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && !file.type.startsWith('audio/')) {
//       alert('Please upload a valid audio file.');
//       return;
//     }
//     if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
//       alert('File size exceeds the 10MB limit.');
//       return;
//     }
//     setAudioFile(file);
//   };

//   const handleSummarize = async () => {
//     if (!audioFile) {
//       return alert('Please upload an audio file.');
//     }

//     setLoading(true); // Set loading to true when request starts

//     const formData = new FormData();
//     formData.append('audio', audioFile);

//     try {
//       const response = await axios.post('http://localhost:5000/api/audio-summary', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setSummary(response.data.summary);
//       setLoading(false); // Reset loading state when response is received
//     } catch (error) {
//       console.error('Error during audio summarization:', error);
//       alert('Failed to process audio.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6">Audio to Text Summarization</h2>

//       {/* File input for audio */}
//       <input
//         type="file"
//         accept="audio/*"
//         onChange={handleFileChange}
//         className="mb-4 p-2 border border-gray-300 rounded"
//       />

//       {/* Button to trigger summarization */}
//       <button
//         onClick={handleSummarize}
//         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
//         disabled={loading} // Disable button while loading
//       >
//         {loading ? (
//           <div className="spinner">Loading...</div> // Add your spinner component here
//         ) : (
//           'Summarize Audio'
//         )}
//       </button>
//       const { SpeechClient } = require('@google-cloud/speech');
// const speechClient = new SpeechClient();

// async function audioToTextConversion(audioPath) {
//     const audio = {
//         content: fs.readFileSync(audioPath).toString('base64'),
//     };
//     const request = {
//         audio,
//         config: {
//             encoding: 'LINEAR16',
//             languageCode: 'en-US',
//         },
//     };
//     const [response] = await speechClient.recognize(request);
//     return response.results.map(result => result.alternatives[0].transcript).join('\n');
// }


//       {/* Display the summary if available */}
//       {summary && (
//         <div className="mt-8 p-4 bg-white rounded-md shadow-md max-w-md">
//           <h3 className="font-semibold text-lg">Summary:</h3>
//           <p className="text-gray-700 mt-2">{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioToText;
