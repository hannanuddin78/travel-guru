import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [ifNewUser, setIfNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn : false,
        name : '',
        email : '',
        password : '',
        error : '',
        success : '',
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignInBtn = () => {          //google Sign In function
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, email} = res.user;
            const signInUser ={
                isSignIn: true,
                name : displayName,
                email : email
            }
            setUser(signInUser);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const handleFbSignInBtn = () => {
        const  fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            const {displayName, email} = result.user;
            const signInUser ={
                isSignIn: true,
                name : displayName,
                email : email
            }
            setUser(signInUser)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    const handleGoogleSignOutBtn = () => {      //google sign out function
        firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignIn : false,
                name : '',
                email : '',
            }
            setUser(signOutUser);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const handleBlur = (e) => {                 //collection from information when i creat account
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const ifPasswordLength = e.target.value.length >= 5;
            const needsPasswordNumber = /\d{1}/.test(e.target.value);
            isFieldValid = ifPasswordLength && needsPasswordNumber ;
        }
        if (isFieldValid) {
            const isNewUser = {...user};
            isNewUser[e.target.name] = e.target.value;
            setUser(isNewUser);
        }
    }

    const handleSubmit = (e) => {                   //this function collects data from and send data to firebase
        if (ifNewUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserInfo(user.name);
            })
            .catch(err => {
                const newUserInfo = {...user};
                newUserInfo.error = err.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            })
        }
        if (!ifNewUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                console.log('sign in user', res.user);
            })
            .catch(err => {
                const newUserInfo = {...user};
                newUserInfo.error = err.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            })
        }
        e.preventDefault();
    }

    const updateUserInfo = (name) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        })
        .then(res =>{
            console.log('user name update successfully');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Container  className="login-container">
            <h2>Welcome to, {user.name}</h2>
            <h5>It is your Email : {user.email}</h5>
            <Card className="login-card">
                <Form onSubmit={handleSubmit} className="login-from">
                    {ifNewUser && <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleBlur} type="name" name="name" placeholder="Enter First Name"/>
                    </Form.Group>}
                    {ifNewUser && <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleBlur} type="name" name="name" placeholder="Enter Last Name"/>
                    </Form.Group>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleBlur} type="email" name="email" placeholder="Enter email" required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleBlur} type="password" name="password" placeholder="Password" required/>
                    </Form.Group>
                    {ifNewUser && <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleBlur} type="password" name="confirm password" placeholder="Confirm Password" required/>
                    </Form.Group>}
                    <Form.Text className="user-error">
                        <p>{user.error}</p>
                        {user.success && <p className="user-success">User {ifNewUser ? 'Created' : 'Logged In'} Successfully Done</p>}
                    </Form.Text>
                    <Button variant="primary" type="submit">
                        {ifNewUser ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Form.Text onClick={() => setIfNewUser(!ifNewUser)} className="user-check">
                        {ifNewUser ? <p>Already have an account? Login</p> : <p>Don’t have an account? Create an account</p>}
                    </Form.Text>
                </Form>
                {user.isSignIn ? <button onClick={handleGoogleSignOutBtn}>Sign Out To Google</button> : <button onClick={handleGoogleSignInBtn}>Continue with Google</button>}
                <Button onClick={handleFbSignInBtn}>Continue with Facebook </Button>
            </Card>
            
        </Container>
    );
};

export default Login;