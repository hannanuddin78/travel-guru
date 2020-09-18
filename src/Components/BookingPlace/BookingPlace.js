import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import travelData from '../../fakeData/TravelData';
import travelPlaceHotel from '../../fakeData/TravelPlacehotel';
import HotelRoom from '../HotelRoom/HotelRoom';
import AddressMap from '../SimpleMap/AddressMap';

const BookingPlace = () => {
    const {selectPlace} =  useParams();
    const hotelDetails = travelPlaceHotel.filter(hotel => hotel.placeId.toString() === selectPlace);
    const place = travelData.find(place => place.id.toString() === selectPlace);
    return (
        <Container>
            <Row>
                <Col md={6}>
                    {hotelDetails.map(hotel => <HotelRoom key={hotel.id} hotel={hotel}></HotelRoom>)}
                </Col>
                <Col md={6}>
                    <AddressMap place={place}></AddressMap>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingPlace;