import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import axios from "axios";

const DetailView = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/restaurant/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  return (
    <Container className="mt-4">
      <h2>Restaurant Detail</h2>
      {restaurant ? (
        <Card>
          <Card.Img variant="top" src={restaurant.image} />
          <Card.Body>
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>Rating: {restaurant.rating}</Card.Text>
            <Card.Text>Price: {restaurant.price}</Card.Text>
            <Card.Text>Category: {restaurant.category.name}</Card.Text>
            
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default DetailView;
