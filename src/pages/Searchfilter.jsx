import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchFilter() {
    const [cars, setCars] = useState([]);
    const [filtered, setFiltered] = useState([]);

    // UI state
    const [q, setQ] = useState("");
    const [seat, setSeat] = useState("");
    const [fuel, setFuel] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);
    const [price, setPrice] = useState(0);

    const [dark, setDark] = useState(false); // 🌙 dark mode toggle
    const [showFilters, setShowFilters] = useState(false); // 📱 mobile filters

    const normalizePrice = (v) => {
        if (typeof v === "number") return v;
        if (v == null) return 0;
        const n = Number(String(v).replace(/[^\d.]/g, ""));
        return Number.isNaN(n) ? 0 : n;
    };

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/basil648/my_fake_api/cars")
            .then((res) => res.json())
            .then((data) => {
                const normalized = data.map((item) => ({
                    ...item,
                    seatsNum: Number(item.seats),
                    fuelNorm: String(item.fuel || "").toLowerCase(),
                    rentNum: normalizePrice(item.rentPerDay),
                }));

                const computedMax = Math.max(...normalized.map((c) => c.rentNum), 0);
                setCars(normalized);
                setFiltered(normalized);
                setMaxPrice(computedMax);
                setPrice(computedMax);
            });
    }, []);

    useEffect(() => {
        const res = cars.filter((c) => {
            if (q && !c.name?.toLowerCase().includes(q.toLowerCase())) return false;
            if (seat && c.seatsNum !== Number(seat)) return false;
            if (fuel && c.fuelNorm !== fuel.toLowerCase()) return false;
            if (price && c.rentNum > Number(price)) return false;
            return true;
        });
        setFiltered(res);
    }, [q, seat, fuel, price, cars]);

    const resetFilters = () => {
        setQ("");
        setSeat("");
        setFuel("");
        setPrice(maxPrice);
    };

    const themeStyles = {
        background: dark ? "#1a1a1a" : "#f9f9f9",
        color: dark ? "#eee" : "#222",
    };

    const boxStyles = {
        background: dark ? "#2a2a2a" : "#fff",
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
    };

    return (
        <div style={{ ...themeStyles, minHeight: "100vh", padding: 20 }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                    gap: 12,
                }}
            >
                <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
                    {/* Back Button */}
                    <button
                        style={{
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "none",
                            background: dark ? "#444" : "#e0e0e0",
                            cursor: "pointer",
                            fontSize: 14,
                            
                        }}
                       
                    >
                        <Link to={"/cars"}>← Back</Link>
                        
                    </button>

                    {/* Search bar in header */}
                    <input
                        type="text"
                        placeholder="Search by name…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        style={{
                            flex: 1,
                            minWidth: "160px",
                            padding: "6px 10px", // smaller
                            fontSize: 14, // smaller font
                            borderRadius: 8,
                            border: "1px solid #bbb",
                            background: dark ? "#333" : "#f5f5f5",
                            color: dark ? "#eee" : "#222",
                        }}
                    />
                </div>

                {/* Right side controls */}
                <div style={{ display: "flex", gap: 8 }}>
                    {/* Hamburger on mobile */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            display: "none",
                            padding: "6px 10px",
                            border: "none",
                            borderRadius: 6,
                            background: dark ? "#444" : "#ddd",
                            cursor: "pointer",
                        }}
                        className="hamburger-btn"
                    >
                        ☰ Filters
                    </button>

                    {/* Dark mode toggle */}
                    <button
                        onClick={() => setDark(!dark)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            border: "none",
                            background: dark ? "#444" : "#ddd",
                            cursor: "pointer",
                            fontSize: 14,
                        }}
                    >
                        {dark ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "280px 1fr",
                    gap: 20,
                }}
                className="layout"
            >
                {/* Sidebar filters */}
                <div
                    style={{
                        ...boxStyles,
                        height: "fit-content",
                    }}
                    className={`filters-box ${showFilters ? "open" : ""}`}
                >
                    <h3 style={{ marginBottom: 12 }}>Filters</h3>

                    {/* Seats */}
                    <label style={{ display: "block", marginBottom: 6 }}>Seats</label>
                    <select
                        value={seat}
                        onChange={(e) => setSeat(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            marginBottom: 12,
                        }}
                    >
                        <option value="">All seats</option>
                        <option value="2">2 seats</option>
                        <option value="4">4 seats</option>
                        <option value="5">5 seats</option>
                        <option value="7">7 seats</option>
                    </select>

                    {/* Fuel */}
                    <label style={{ display: "block", marginBottom: 6 }}>Fuel</label>
                    <select
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            marginBottom: 12,
                        }}
                    >
                        <option value="">All fuel</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </select>

                    {/* Max Rent */}
                    <label style={{ display: "block", marginBottom: 6 }}>
                        Max Rent: {price ? `₹${Number(price).toLocaleString()}` : "—"}
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={maxPrice || 0}
                        step={100}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        style={{ width: "100%", marginBottom: 8 }}
                    />
                    <input
                        type="number"
                        min={0}
                        max={maxPrice || 0}
                        step={100}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value || 0))}
                        style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            marginBottom: 12,
                        }}
                    />

                    <button
                        onClick={resetFilters}
                        style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 8,
                            border: "none",
                            background: "#007bff",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Results */}
                <div>
                    <p style={{ opacity: 0.7, marginBottom: 12 }}>
                        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                    </p>
                    {filtered.length === 0 ? (
                        <p>No cars match your filters.</p>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                                gap: 16,
                            }}
                        >
                            {filtered.map((car) => (
                                <div
                                    key={car.id}
                                    style={{
                                        background: dark ? "#2a2a2a" : "#fff",
                                        border: "1px solid #ddd",
                                        borderRadius: 12,
                                        padding: 12,
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {car.image && (
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            style={{
                                                width: "100%",
                                                height: 140,
                                                objectFit: "cover",
                                                borderRadius: 10,
                                                marginBottom: 8,
                                            }}
                                        />
                                    )}
                                    <div style={{ fontWeight: 600, marginBottom: 6 }}>
                                        {car.name}
                                    </div>
                                    <div style={{ fontSize: 14, opacity: 0.8 }}>
                                        Seats: {car.seatsNum} • Fuel: {car.fuel}
                                    </div>
                                    <div style={{ marginTop: 6, fontWeight: 600 }}>
                                        ₹{car.rentNum.toLocaleString()}/day
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        style={{
                                            marginTop: "auto",
                                            padding: "8px 12px",
                                            border: "none",
                                            borderRadius: 8,
                                            background: dark ? "#444" : "#e0e0e0",
                                            cursor: "pointer",
                                            marginTop: 12,
                                            fontSize: 14,
                                            fontWeight: 500,
                                        }}
                                    >
                                       <Link to={`/cars/${car.id}`}> View Details</Link>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>
                {`
          @media (max-width: 768px) {
            .layout {
              grid-template-columns: 1fr; /* stack */
            }
            .filters-box {
              display: none;
            }
            .filters-box.open {
              display: block;
              margin-bottom: 20px;
            }
            .hamburger-btn {
              display: inline-block !important;
            }
          }
        `}
            </style>
        </div>
    );
}
