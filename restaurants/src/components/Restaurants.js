
import { Card, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./restaurants.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Restaurants({ resto }) {
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= resto.isOpen && currentHour < resto.isClose;

  return (
    <Col md={3} className="mb-5">
      <Card className="card">
        <Link to={`/restaurant/${resto.id}`}>
          <Card.Img variant="top" src={resto.image} className="img-resto" />
        </Link>
        <Card.Body>
          <Card.Title>{resto.name}</Card.Title>
          <StarRating rating={resto.rating} />
          <Container className="container-item">
            <Card.Text className="text-secondary ">
              {resto.category.name} • {resto.price}
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
            <Link to={`/restaurant/${resto.id}`}>
              <button className="button">LEARN MORE</button>
            </Link>
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
