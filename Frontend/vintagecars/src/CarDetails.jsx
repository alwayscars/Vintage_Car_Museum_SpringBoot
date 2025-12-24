import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [username, setUsername] = useState("");
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [storyText, setStoryText] = useState("");
  const [stories, setStories] = useState([]);

  // Load session username
  useEffect(() => {
    axios
      .get("https://dj6xr77s-8080.inc1.devtunnels.ms/auth/session-user", { withCredentials: true })
      .then((res) => setUsername(res.data))
      .catch((err) => console.error("Failed to load session user:", err));
  }, []);

  // Load car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`https://dj6xr77s-8080.inc1.devtunnels.ms/cars/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch car:", err);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // Load stories
  const fetchStories = async () => {
    try {
      const response = await axios.get(`https://dj6xr77s-8080.inc1.devtunnels.ms/stories/car/${id}`);
      setStories(response.data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [id]);

  // Save story
  const submitStory = async () => {
    if (!storyText.trim()) return;

    try {
      await axios.post("https://dj6xr77s-8080.inc1.devtunnels.ms/stories/create", {
        carId: id,
        storyText: storyText.trim(),
        username: username
      }, { withCredentials: true });

      setStoryText("");
      fetchStories();

    } catch (error) {
      console.error("Failed to post story:", error);
    }
  };

  // logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://dj6xr77s-8080.inc1.devtunnels.ms/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  };

  // audio controls
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="car-details-container">
      <div className="background-pattern"></div>
      <div className="chrome-line top" />
      <div className="chrome-line bottom" />

      <nav className="top-nav">
        <span className="welcome-text">Welcome, {username}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="car-details-wrapper">
        {loading && <p className="loading">Loading car details...</p>}

        {car && (
          <>
            <div className="header-content">
              <h1 className="car-title">{car.brand} {car.model}</h1>
              <p className="car-year-range">{car.yearRange}</p>
            </div>

            <div className="car-image-container">
              <img
                src={`https://dj6xr77s-8080.inc1.devtunnels.ms${car.imageUrl}`}
                alt={car.model}
                className="car-details-image"
                onError={(e) => (e.target.src = "/placeholder.svg")}
              />
            </div>

            <div className="car-details-card">
              <div className="detail-row">
                <span className="detail-label">Brand:</span>
                <span className="detail-value">{car.brand}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Model:</span>
                <span className="detail-value">{car.model}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Period:</span>
                <span className="detail-value">{car.yearRange}</span>
              </div>
              
              <div className="divider-chrome" />
              
              <div className="description-section">
                <h3 className="description-title">Description</h3>
                <p className="description-text">{car.description}</p>
              </div>

              {car.audioUrl && (
                <>
                  <div className="divider-chrome" />
                  
                  <div className="audio-section">
                    <h3 className="audio-title">Engine Sound</h3>
                    <button 
                      className={`audio-button ${isPlaying ? 'playing' : ''}`}
                      onClick={toggleAudio}
                    >
                      {isPlaying ? "Stop Engine Sound" : "Play Engine Sound"}
                    </button>

                    <audio
                      ref={audioRef}
                      src={`https://dj6xr77s-8080.inc1.devtunnels.ms${car.audioUrl}`}
                      onEnded={handleAudioEnded}
                    />
                  </div>
                </>
              )}
            </div>

            {/* OWNERSHIP STORIES */}
            <div className="stories-section">
              <h3 className="stories-title">Ownership Stories</h3>

              <textarea
                className="story-input"
                placeholder="Share your story about this car..."
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitStory();
                  }
                }}
              />

              <button 
                className="submit-story-button" 
                onClick={submitStory}
                disabled={!storyText.trim()}
              >
                Submit Story
              </button>

              <div className="stories-list">
                {stories.length === 0 ? (
                  <p className="no-story-text">No stories yet — be the first!</p>
                ) : (
                  stories.map((story) => (
                    <div key={story.id} className="story-card">
                      <span className="story-user">{story.username}</span>
                      <p className="story-text">{story.storyText}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>
              ← Back to Collection
            </button>
          </>
        )}
      </div>

      <p className="footer">© 2025 Vintage Car Collection. All rights reserved.</p>
    </div>
  );
};

export default CarDetails;