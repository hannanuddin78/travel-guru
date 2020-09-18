import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './Components/MenuBar/MenuBar';
import TravelPlace from './Components/TravelPlace/TravelPlace';
import bgImg from '../src/img/Rectangle1.png'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import BookingPlace from './Components/BookingPlace/BookingPlace';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgImg})`}} className="header">
          <Router>
            <MenuBar></MenuBar>
            <Switch>
              <Route path="/home">
                <TravelPlace></TravelPlace>
              </Route>
              <Route path="/destination/:id">
                <PlaceDetails></PlaceDetails>
              </Route>
              <PrivateRoute path="/booking/:selectPlace">
                <BookingPlace></BookingPlace>
              </PrivateRoute>
              <Route exact path="/">
                <TravelPlace></TravelPlace>
              </Route>
              <Route exact path="/login">
                <Login></Login>
              </Route>
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
  );
}

export default App;
