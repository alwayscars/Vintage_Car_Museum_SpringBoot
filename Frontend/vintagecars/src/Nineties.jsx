import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Fifties.css";

const Nineties = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch session username
  useEffect(() => {
    axios
      .get("https://dj6xr77s-8080.inc1.devtunnels.ms/auth/session-user", { withCredentials: true })
      .then((res) => setUsername(res.data))
      .catch((err) => console.error("Failed to load session user:", err));
  }, []);

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://dj6xr77s-8080.inc1.devtunnels.ms/cars/year/90s"
        );
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        setError("Failed to load cars");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle logout
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

  // Back navigation
  const handleBack = () => {
    navigate("/home");
  };

  // When car is clicked
  const handleCarClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  return (
    <div className="fifties-container">
      <div className="background-pattern"></div>
      <div className="chrome-line top"></div>
      <div className="chrome-line bottom"></div>

      {/* Top Navigation */}
      <nav className="top-nav">
        <span className="welcome-text">Welcome {username}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="fifties-wrapper">
        <div className="header-section">
          <h1 className="main-title">1990's</h1>
          <p className="subtitle">Classic Automobiles</p>
        </div>

        <button className="back-button" onClick={handleBack}>
          ← Back to Periods
        </button>

        <div className="fifties-card">
          <h2 className="card-title">Vintage Collection</h2>
          <div className="divider"></div>

          {loading && (
            <div className="loading-state">
              <p>Loading cars...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && cars.length === 0 && (
            <div className="empty-state">
              <p>No cars found from the 1990's</p>
            </div>
          )}

          {!loading && !error && cars.length > 0 && (
            <div className="cars-grid">
              {cars.map((car) => (
                <button
                  key={car.id}
                  className="car-card"
                  onClick={() => handleCarClick(car.id)}
                >
                  <div className="car-image-container">
                    <img
                      src={`https://dj6xr77s-8080.inc1.devtunnels.ms${car.imageUrl}`}
                      alt={car.model}
                      className="car-image"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="car-info">
                    <h3 className="car-model">{car.model}</h3>
                    <p className="car-brand">{car.brand}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="footer">© 2025 Vintage Car Collection</p>
      </div>
    </div>
  );
};

export default Nineties;
