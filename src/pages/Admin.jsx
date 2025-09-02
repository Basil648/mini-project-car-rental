// src/components/AdminPanel.jsx
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, Admin!</h1>
      <p>This is your admin panel.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Logout
      </button>
    </div>
  );
}
