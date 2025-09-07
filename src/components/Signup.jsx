// src/components/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!username || !password) {
            setError("Please fill all fields");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            setError("Username already exists");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        navigate("/login");
    };

    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: "url('https://images.pexels.com/photos/29734293/pexels-photo-29734293.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10%", // move form to left
            }}
        >
            <div
                style={{
                    backgroundColor: "transparent", // fully transparent
                    padding: "50px 40px",
                    borderRadius: "12px",
                    width: "350px",
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 style={{ marginBottom: "25px", color: "#fff", textAlign: "left" }}>Signup</h2>
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
                        color: "#0a0000ff",
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
                        color: "#fff",
                        fontSize: "16px",
                        outline: "none",
                    }}
                />
                <button
                    onClick={handleSignup}
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
                    Signup
                </button>
                {error && <p style={{ color: "red", marginTop: "12px", textAlign: "left" }}>{error}</p>}

                <p style={{ marginTop: "20px", color: "#fff", textAlign: "left" }}>
                    Already have an account? <Link to="/login" style={{ color: "#fff", textDecoration: "underline" }}>Login</Link>
                </p>
            </div>
        </div>
    );
}
