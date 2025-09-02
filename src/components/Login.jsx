// src/components/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // The page user was trying to access, or default to /cars
    const from = location.state?.from?.pathname || "/cars";

    const handleLogin = () => {
        // Admin login
        if (username === "admin" && password === "1234") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
            return;
        }

        // Normal user login
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(
            (u) => u.username === username && u.password === password
        );

        if (userExists) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isAdmin", "false");
            navigate(from, { replace: true }); // redirect to original page or /cars
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ display: "block", width: "100%", margin: "10px 0", padding: "10px" }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", width: "100%", margin: "10px 0", padding: "10px" }}
            />
            <button onClick={handleLogin} style={{ padding: "10px 20px", marginTop: "10px" }}>
                Login
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            <p style={{ marginTop: "15px" }}>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}

export default LoginPage;
