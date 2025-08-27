import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Carlisting() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/basil648/my_fake_api/cars")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Error fetching cars:", err));
  })
  return (
    <>
      <h1 style={{textAlign:'center'}}>Available Cars</h1>

      <ul>
        {cars.map(car => (
          <li key={car.id}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={car.image} />
            <Card.Body>
              <Card.Title>{car.name}</Card.Title>
              <Card.Text>
                {car.seats} <br /> {car.fuel} <br />{car.rentPerDay}/day
              </Card.Text>
              <Button variant="primary">view details</Button>
            </Card.Body>
          </Card>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Carlisting