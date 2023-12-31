import { Card, Col, Container } from "react-bootstrap";
import "./restaurants.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Restaurants({ resto }) {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= resto.isOpen && currentHour < resto.isClose;

  return (
    <Col md={3}>
      <Card className="card">
        <Card.Img variant="top" src={resto.image} className="img-resto" />

        <Card.Body>
          <Card.Title className="restoName">{resto.name}</Card.Title>
          <StarRating rating={resto.rating} />
          <Container className="container-item">
            <Card.Text className="text-secondary ">
              {resto.category.name} •{resto.price}
            </Card.Text>
            <Card.Text>
              {isOpenNow ? (
                <p>
                  <span className="open">•</span>OPEN NOW
                </p>
              ) : (
                <p>
                  <span className="closed">•</span>CLOSED
                </p>
              )}
            </Card.Text>
          </Container>

          <div className="button-con">
            <button className="button" onClick={() => navigate(`/resto/${resto.id}`)}>
              LEARN MORE
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="rating-blue" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="rating-grey" />);
    }
  }

  return <div>{stars}</div>;
};
