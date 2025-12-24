import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("https://dj6xr77s-8080.inc1.devtunnels.ms/auth/session-user", { withCredentials: true })
      .then((res) => setUsername(res.data))
      .catch((err) => console.error("Failed to load session user:", err));
  }, []);

  const periods = ["50s", "60s", "70s", "80s", "90s", "2000s", "2010s"];

  const periodRoutes = {
    "50s": "/fifties",
    "60s": "/sixties",
    "70s": "/seventies",
    "80s": "/eighties",
    "90s": "/nineties",
    "2000s": "/Twothousands",
    "2010s": "/twothousandten"
  };

  const handlePeriodClick = (period) => {
    const route = periodRoutes[period];
    if (route) {
      navigate(route);
    }
  };

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
    }
  };

  return (
    <div className="home-container">
      {/* Background Pattern */}
      <div className="background-pattern" />

      {/* Chrome Lines */}
      <div className="chrome-line top" />
      <div className="chrome-line bottom" />

      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <span className="welcome-text">Welcome {username}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="home-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-title">VINTAGE CAR MUSEUM</h1>
          <p className="subtitle">Timeless Elegance</p>
        </div>

        {/* Content Card */}
        <div className="home-card">
          <h2 className="card-title">PERIOD</h2>
          <div className="divider" />

          <div className="period-buttons">
            {periods.map((period) => (
              <button
                key={period}
                className="period-button"
                onClick={() => handlePeriodClick(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="footer">© 2025 Vintage Car Museum. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
