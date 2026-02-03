import React, { useState } from "react";
// import "./login.css";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ---------------- REGISTER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      user_name: registerData.username.trim(),
      user_email: registerData.email.trim(),
      user_password: registerData.password,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setRegisterData({ username: "", email: "", password: "" });
        setActiveTab("login");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      user_email: loginData.email.trim(),
      user_password: loginData.password,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
          type="button"
        >
          Login
        </button>

        <button
          className={activeTab === "register" ? "active" : ""}
          onClick={() => setActiveTab("register")}
          type="button"
        >
          Register
        </button>
      </div>

      {/* ---------------- LOGIN FORM ---------------- */}
      {activeTab === "login" && (
        <form onSubmit={handleLogin}>
          <h2>🔐 Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />

          <div className="password-box">
            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            <i
              className={`fa-solid ${
                showLoginPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={() => setShowLoginPassword(!showLoginPassword)}
            ></i>
          </div>

          <button type="submit">Login</button>
        </form>
      )}

      {/* ---------------- REGISTER FORM ---------------- */}
      {activeTab === "register" && (
        <form onSubmit={handleRegister}>
          <h2>📝 Register</h2>

          <input
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            required
          />

          <div className="password-box">
            <input
              type={showRegisterPassword ? "text" : "password"}
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
            <i
              className={`fa-solid ${
                showRegisterPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
            ></i>
          </div>

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default AuthPage;