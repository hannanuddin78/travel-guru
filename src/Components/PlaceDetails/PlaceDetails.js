import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import travelData from '../../fakeData/TravelData';

const PlaceDetails = () => {
    const {id} = useParams();
    const selectPlace = travelData.find(td => td.id.toString() === id);
    console.log(selectPlace);
    // const history = useHistory();

    // const handelBooking = (id) => {
    //     selectPlace(id)
    //     history.Push("/booking/")
    // }
    return (
        <Container>
            <Row className="place-details">
                <Col md={6}>
                    <h1>{selectPlace.name}</h1>
                    <p>{selectPlace.details}</p>
                </Col>
                <Col md={6}>
                    <Card body>
                        <Form>
                            <Form.Row>
                                <Form.Label>Origin</Form.Label>
                                <Form.Control placeholder="Type Your Origin" />

                                <Form.Label>Destination</Form.Label>
                                <Form.Control placeholder="Type Your Destination" />
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Link to={"/booking/"+id}><Button variant="primary" type="submit"> Booking Place</Button></Link>
                            </Form.Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceDetails;