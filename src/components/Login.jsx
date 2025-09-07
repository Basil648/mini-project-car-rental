// src/components/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/cars";

    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("username", "admin");
            navigate("/admin");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(
            (u) => u.username === username && u.password === password
        );

        if (userExists) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isAdmin", "false");
            localStorage.setItem("username", username);
            navigate(from, { replace: true });
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: "url('https://images.pexels.com/photos/30674484/pexels-photo-30674484.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10%", // move form to left
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)", // fully transparent
                    padding: "50px 40px",
                    borderRadius: "12px",
                    width: "350px",
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 style={{ marginBottom: "25px", color: "#fff", textAlign: "left" }}>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        display: "block",
                        width: "100%",
                        margin: "10px 0",
                        padding: "12px 15px",
                        borderRadius: "6px",
                        border: "2px solid #222", // dark border
                        backgroundColor: "transparent",
                        color: "#050000ff",
                        fontSize: "16px",
                        outline: "none",
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        display: "block",
                        width: "100%",
                        margin: "10px 0",
                        padding: "12px 15px",
                        borderRadius: "6px",
                        border: "2px solid #222", // dark border
                        backgroundColor: "transparent",
                        color: "#120101ff",
                        fontSize: "16px",
                        outline: "none",
                    }}
                />
                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginTop: "20px",
                        borderRadius: "4px",
                        border: "2px solid #222", // dark border
                        backgroundColor: "transparent",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#222";
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#fff";
                    }}
                >
                    Login
                </button>
                {error && <p style={{ color: "red", marginTop: "12px", textAlign: "left" }}>{error}</p>}

                <p style={{ marginTop: "20px", color: "#fff", textAlign: "left" }}>
                    Don't have an account? <Link to="/signup" style={{ color: "#0a0101ff", textDecoration: "underline" }}>Signup</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
