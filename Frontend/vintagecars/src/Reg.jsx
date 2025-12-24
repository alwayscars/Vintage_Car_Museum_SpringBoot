import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Reg.css";

const Reg = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !username.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('https://dj6xr77s-8080.inc1.devtunnels.ms/auth/register', {
        email: email,
        username: username,
        password: password
      });

      alert(response.data);
      // Reset form
      setEmail("");
      setUsername("");
      setPassword("");
      // Optionally redirect to login page
      window.location.href = '/';
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        alert("Registration failed: " + error.response.data);
      } else if (error.request) {
        // Request made but no response
        alert("Error connecting to server: No response received");
      } else {
        // Other errors
        alert("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(210, 40%, 50%) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Decorative Chrome Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide text-gradient-silver mb-2">
            VINTAGE CARS
          </h1>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Timeless Elegance
          </p>
        </div>

        {/* Registration Card */}
        <div className="card-vintage">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Create Account
          </h2>

          <div className="divider-chrome mb-6" />

          <div className="space-y-5">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-vintage"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-vintage"
                placeholder="Choose a username"
                autoComplete="username"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-vintage"
                placeholder="Create a password"
                autoComplete="new-password"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="btn-chrome w-full rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="divider-chrome my-6" />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
                to="/"
              className="text-primary hover:text-foreground transition-colors font-medium"

            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wide">
          © 2025 Vintage Cars. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Reg;