import React from "react";

const ASL = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1>ASL Interpreter Live Feed</h1>
      <img
        src="http://localhost:5000/video_feed"
        alt="Live Video Stream"
        style={{ border: "2px solid black", width: "50%", height: "auto" }}
      />
    </div>
  );
};

export default ASL;
