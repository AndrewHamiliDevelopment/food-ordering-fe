import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSignup({ isOpen, setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const navigate = useNavigate();

  // If the modal is closed, return null (no rendering)
  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user-info", JSON.stringify(response.data));
        navigate("/home"); // Redirect after successful login
        setIsOpen(false); // Close the modal after login
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = async () => {
    if (password !== reEnterPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        email,
        address,
        mobile,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("user-info", JSON.stringify(response.data));
        navigate("/home"); // Redirect after successful sign-up
        setIsOpen(false); // Close the modal after sign-up
      }
    } catch (error) {
      setError("Error during sign-up. Please try again.");
    }
  };

  return (

    
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure modal is above other content
      }}
      onClick={() => setIsOpen(false)} // Close modal if clicked outside
    >
      <div
        style={{
          background: "linear-gradient(to right, rgb(43, 45, 48), rgb(44, 175, 55))",
          width: "380px",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "24px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => setIsOpen(false)} // Close the modal
        >
          &times;
        </button>

        <img
          src="ninja.png"
          alt=" Restourant Logo"
          style={{ width: "60px", display: "block", margin: "0 auto 10px" }}
        />
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>
          {isSignUp ? "Sign Up" : "Log In"}
        </h2>
        <p>{isSignUp ? "Create a new (ADMIN) account" : "Log in as existing (ADMIN)"}</p>

        {/* Form Fields */}
        <div>
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="First Name"
                style={inputStyle}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                style={inputStyle}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                style={inputStyle}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                style={inputStyle}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div style={inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
              <div style={inputWrapper}>
                <input
                  type={showReEnterPassword ? "text" : "password"}
                  placeholder="Re-enter Password"
                  style={inputStyle}
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                />
                <div
                  style={eyeIcon}
                  onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                >
                  {showReEnterPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </>
          )}

          {/* Login Form */}
          {!isSignUp && (
            <>
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        </div>

        <button
          onClick={isSignUp ? handleSignUp : handleLogin}
          style={buttonStyle}
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <div style={{ marginTop: "10px" }}>
          <a
            href="#"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ fontSize: "14px", color: "blue" }}
          >
            {isSignUp
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </a>
        </div>

        <div style={{ marginTop: "10px" }}>
          <a
            href="#"
            style={{ fontSize: "14px", color: "blue" }}
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>

  );
}

const inputStyle = {
  width: "95%",
  padding: "10px",
  margin: "8px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "14px",
};

const inputWrapper = {
  position: "relative",
};

const eyeIcon = {
  position: "absolute",
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const buttonStyle = {
  width: "100%",
  background: "gray",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default LoginSignup;
