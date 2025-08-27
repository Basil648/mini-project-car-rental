import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/basil648/my_fake_api/cars/${id}`)
            .then(res => res.json())
            .then(data => setCar(data))
            .catch(err => console.error("Error fetching cars:", err));
    }, []);

    if (!car) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h1>{car.name}</h1>
            <img src={car.image} alt={car.name} style={{ width: '300px' }} />
            <p>Seats: {car.seats}</p>
            <p>Price: ${car.rentPerDay}/day</p>
            <p>Some description about the car goes here...</p>
            <Link to={`/booking/${car.id}`} className="btn btn-primary">
                Book Now
            </Link>
        </div>
    );
}

export default CarDetails;
