import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlaceCarousel = (props) => {
    const {name, img, id} = props.place;
    // console.log(props.place);
    return (
        <Col md={3}>
                <Link to={"/destination/"+id}>
                    <Card className="place-card">
                        <Card.Body style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${img})` }} className="place-bg-img">
                            <Card.Title>{name}</Card.Title>
                            <Card.Link href="#" className="place-card-link">Booking</Card.Link>
                        </Card.Body>
                    </Card>
                </Link>
        </Col>
    );
};

export default PlaceCarousel;