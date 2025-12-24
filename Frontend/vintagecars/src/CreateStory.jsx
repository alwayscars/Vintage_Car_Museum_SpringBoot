import React, { useState } from "react";
import axios from "axios";

const CreateStory = () => {
  const [storyText, setStoryText] = useState("");
  const [carId, setCarId] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const carIdNumber = parseInt(carId);
    if (!storyText || isNaN(carIdNumber)) {
      setResult("Please enter valid Story Text and Car ID.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/stories/create",
        { storyText, carId: carIdNumber },
        { withCredentials: true }
      );

      setResult(`Story saved! ID: ${response.data?.id ?? "unknown"}`);
      setStoryText("");
      setCarId("");
    } catch (error) {
      console.error(error);
      setResult(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Create New Story</h2>
      
      <div style={{ marginBottom: "10px" }}>
        <label>Story Text:</label><br />
        <textarea
          rows="5"
          cols="40"
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
        ></textarea>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Car ID:</label><br />
        <input
          type="number"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </div>

      <button 
        type="button"
        onClick={handleSubmit} 
        disabled={isLoading}
        style={{ padding: "10px 20px" }}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {result && <p style={{ marginTop: "15px" }}>{result}</p>}
    </div>
  );
};

export default CreateStory;