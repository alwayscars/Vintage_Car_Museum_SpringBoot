import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Caradmin.css";
import { useNavigate } from "react-router-dom";

const ADMIN_CODE = "vintageadmin123";

const Caradmin = () => {
     const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    yearRange: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [verified, setVerified] = useState(
    sessionStorage.getItem("adminVerified") === "true"
  );

  const [loginCode, setLoginCode] = useState("");

  // LOAD CARS -------------------------------------------------
  const loadCars = async () => {
    try {
      const res = await axios.get("https://dj6xr77s-8080.inc1.devtunnels.ms/cars/all");
      setCars(res.data);
    } catch (e) {
      console.error("Error loading cars", e);
    }
  };

  useEffect(() => {
    if (!verified) loadCars();
  }, [verified]);

  // // VERIFY ADMIN ---------------------------------------------
  // const verifyAdmin = () => {
  //   if (loginCode === ADMIN_CODE) {
  //     sessionStorage.setItem("adminVerified", "true");
  //     setVerified(true);
  //   } else {
  //     alert("Wrong admin code!");
  //   }
  // };

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

  // HANDLE INPUT ---------------------------------------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => setImage(e.target.files[0]);
  const handleAudio = (e) => setAudio(e.target.files[0]);

  // CREATE CAR ------------------------------------------------
  const createCar = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("model", formData.model);
    data.append("brand", formData.brand);
    data.append("yearRange", formData.yearRange);
    data.append("description", formData.description);

    if (image) data.append("image", image);
    if (audio) data.append("audio", audio);

    try {
      await axios.post("https://dj6xr77s-8080.inc1.devtunnels.ms/cars/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Car Created!");
      setFormData({
        model: "",
        brand: "",
        yearRange: "",
        description: "",
      });
      setImage(null);
      setAudio(null);

      loadCars();
    } catch (err) {
      alert("Error creating car");
    }
  };

  // DELETE CAR ----------------------------------------------
  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await axios.delete(`https://dj6xr77s-8080.inc1.devtunnels.ms/cars/delete/${id}`);
      alert("Car Deleted");
      loadCars();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="admin-wrapper">

      {/* IF NOT VERIFIED — SHOW LOGIN
      {!verified && (
        <div className="admin-card">
          <h1 className="admin-title">ADMIN LOGIN</h1>
          <input
            type="password"
            placeholder="Enter admin code"
            className="login-input"
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
          />

          <button className="admin-btn" onClick={verifyAdmin}>
            Verify
          </button>
        </div>
      )} */}

      {/* IF VERIFIED — SHOW PANEL */}
      { (
        
        <>
         {/* Top Navigation Bar */}
      <nav className="top-nav">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
          <br></br>
          <br></br>
          <h1 className="admin-title">CAR ADMIN PANEL</h1>
          <p className="admin-subtitle">Create & Manage Cars</p>

          <div className="admin-card">
            <form className="admin-form" onSubmit={createCar}>
              <input type="text" name="model" placeholder="Car Model" value={formData.model} onChange={handleChange} required />
              <input type="text" name="brand" placeholder="Car Brand" value={formData.brand} onChange={handleChange} required />
              <input type="text" name="yearRange" placeholder="Year Range" value={formData.yearRange} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

              <label className="admin-label">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImage} />

              <label className="admin-label">Upload Audio</label>
              <input type="file" accept="audio/*" onChange={handleAudio} />

              <button type="submit" className="admin-btn">Create Car</button>
            </form>
          </div>

          <h2 className="car-list-title">Available Cars</h2>

          <div className="car-list">
            {cars.map((car) => (
              <div key={car.id} className="car-box">
                <h3>{car.brand} {car.model}</h3>
                <p>{car.yearRange}</p>
                <p className="car-text">{car.description?.substring(0, 70)}...</p>

                <button className="delete-btn" onClick={() => deleteCar(car.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Caradmin;
