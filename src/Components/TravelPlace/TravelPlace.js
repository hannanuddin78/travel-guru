import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import travelData from '../../fakeData/TravelData';
import PlaceCarousel from './PlaceCarousel/PlaceCarousel';

const TravelPlace = () => {
    const [travelPlace, setTravelPlace] = useState(travelData);
    const [placeId, setPlaceId] = useState(1);
    const [seePlace, setSeePlace] = useState([]);

    useEffect(() => {
        const data = travelData.find(td => td.id === placeId)
        setSeePlace(data);
    }, [placeId]);
    
    return (
        <div>
            <Container>
                <Row>
                <Col md={3} className="see-place">
                    <h3>{seePlace.name}</h3>
                    <p>{seePlace.details}</p>
                </Col>
                    {travelPlace.map(place => <PlaceCarousel key={place.id} place={place}></PlaceCarousel>)}
                </Row>
            </Container>
        </div>
    );
};

export default TravelPlace;