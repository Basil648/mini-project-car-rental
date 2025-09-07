import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Messages() {
    const [messages, setMessages] = useState([]);

    // Load messages from localStorage
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        setMessages(storedMessages);
    }, []);

    // ✅ Handle message resolve (delete)
    const handleResolve = (index) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
        localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* === Top Bar with Back Button === */}
            <div style={{ padding: "15px" }}>
                <Link
                    to="/admin"
                    className="btn btn-secondary btn-sm"
                >
                    ← Back to Admin
                </Link>
            </div>

            {/* Page Content */}
            <div className="container my-3" style={{ flex: 1 }}>
                <h2>Contact Messages</h2>
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    <ul className="list-group">
                        {messages.map((msg, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                <div>
                                    <h5>{msg.subject}</h5>
                                    <p><strong>Name:</strong> {msg.name}</p>
                                    <p><strong>Email:</strong> {msg.email}</p>
                                    <p><strong>Message:</strong> {msg.message}</p>
                                    <p><small>{msg.date}</small></p>
                                </div>
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleResolve(index)}
                                >
                                    Resolved
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        
            
        </div>
    );
}
