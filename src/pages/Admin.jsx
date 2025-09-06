import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  // form fields
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("");
  const [fuel, setFuel] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [status, setStatus] = useState("available"); // available / not available
  const [image, setImage] = useState("");

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("localCars")) || [];
    setCars(storedCars);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // ✅ Add car
  const handleAddCar = () => {
    if (!name || !seats || !fuel || !rentPerDay || !image) {
      alert("Please fill in all fields!");
      return;
    }

    // ✅ Get last used ID from localStorage, start from 10
    let lastId = parseInt(localStorage.getItem("lastCarId")) || 10;

    const newCar = {
      id: lastId + 1, // first one will be 11
      name,
      seats: parseInt(seats),
      fuel,
      rentPerDay: parseInt(rentPerDay),
      status, // available / not available
      images: [image], // can later allow multiple URLs
    };

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem("localCars", JSON.stringify(updatedCars));

    // ✅ Save last used ID so it continues correctly
    localStorage.setItem("lastCarId", newCar.id);

    // clear input fields
    setName("");
    setSeats("");
    setFuel("");
    setRentPerDay("");
    setStatus("available");
    setImage("");
  };

  // ✅ Delete car
  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    setCars(updatedCars);
    localStorage.setItem("localCars", JSON.stringify(updatedCars));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Welcome, Admin!</h1>

      {/* === Add Car Form === */}
      <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
        <h2>Add a New Car</h2>
        <input
          type="text"
          placeholder="Car Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <input
          type="text"
          placeholder="Fuel Type"
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <input
          type="number"
          placeholder="Rent Per Day"
          value={rentPerDay}
          onChange={(e) => setRentPerDay(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "8px", margin: "5px" }}
        >
          <option value="available">Available</option>
          <option value="not available">Not Available</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: "8px", margin: "5px", width: "250px" }}
        />
        <button onClick={handleAddCar} style={{ padding: "8px 15px", margin: "10px" }}>
          Add Car
        </button>
      </div>

      {/* === Display Cars === */}
      <h2 style={{ marginTop: "30px" }}>Cars Added by Admin</h2>
      {cars.length === 0 ? (
        <p>No cars added yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cars.map((car) => (
            <li
              key={car.id}
              style={{
                margin: "15px auto",
                padding: "15px",
                width: "400px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "left",
              }}
            >
              <img
                src={car.images[0]}
                alt={car.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
              />
              <h3>{car.name}</h3>
              <p>Seats: {car.seats}</p>
              <p>Fuel: {car.fuel}</p>
              <p>Rent: ₹{car.rentPerDay}/day</p>
              <p>Status: {car.status}</p>
              <button
                onClick={() => handleDeleteCar(car.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Logout
      </button>
    </div>
  );
}
