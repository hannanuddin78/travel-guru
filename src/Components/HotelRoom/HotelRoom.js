import React from 'react';
import { Col, Row } from 'react-bootstrap';


const HotelRoom = (props) => {
    const {name, details, img} = props.hotel;

    return (
        <Row className="hotel-room">
            <Col md={6} className="hotel-room">
                <img src={img} alt=""/>
            </Col>
            <Col md={6}>
                <h4>{name}</h4>
                <p>{details}</p>
            </Col>
        </Row>
    );
};

export default HotelRoom;