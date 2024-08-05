import { useState, useEffect, useRef } from 'react';
import InputField from '../components/InputField';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import {login} from "../services/AuthServices"


function LoginPage() {
    
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const passwordField = useRef();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if (!username) {
      errors.username = 'Username must not be empty.';
    }
    if (!password) {
      errors.password = 'Password must not be empty.';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
  };

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState({});

    // const validateForm = () => {
    //     const newErrors = {};
    //     if (!email) newErrors.email = 'Email is required';
    //     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    //     if (!password) newErrors.password = 'Password is required';
    //     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    //     return newErrors;
    //   };

  

    //   const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formErrors = validateForm();
    //     if (Object.keys(formErrors).length > 0) {
    //       setErrors(formErrors);
    //     } else {
    //       setErrors({});
    //       try {
    //         const userData = await login(email, password);
    //         console.log('Login successful:', userData);
    //         // Here you would typically store the user data and redirect
    //       } catch (error) {
    //         setErrors({ form: 'Login failed. Please try again.' });
    //       }
    //     }
    //   };

      

    return (

   <>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username" label="Username or email address"
          error={formErrors.username} fieldRef={usernameField} />
        <InputField
          name="password" label="Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <Button variant="primary" type="submit">Login</Button>
      </Form>

      <hr />
      <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>

  </>
     

      // <Container>
      //   <Row className="justify-content-md-center mt-5">
      //     <Col xs={12} md={6}>
      //       <h2 className="text-center mb-4">Login</h2>
      //       <Form onSubmit={handleSubmit}>
      //         <Form.Group className="mb-3" controlId="formBasicEmail">
      //           <Form.Label>Email address</Form.Label>
      //           <Form.Control
      //             type="email"
      //             placeholder="Enter email"
      //             value={email}
      //             onChange={(e) => setEmail(e.target.value)}
      //             isInvalid={!!errors.email}
      //           />
      //               <Form.Control.Feedback type="invalid">
      //         {errors.email}
      //       </Form.Control.Feedback>
      //         </Form.Group>
  
      //         <Form.Group className="mb-3" controlId="formBasicPassword">
      //           <Form.Label>Password</Form.Label>
      //           <Form.Control
      //             type="password"
      //             placeholder="Password"
      //             value={password}
      //             onChange={(e) => setPassword(e.target.value)}
      //             isInvalid={!!errors.password}
      //           />
      //            <Form.Control.Feedback type="invalid">
      //         {errors.password}
      //       </Form.Control.Feedback>
      //         </Form.Group>
  
      //         <Button onClick={handleSubmit} variant="primary" type="submit" className="w-100">
      //           Login
      //         </Button>
      //       </Form>
      //     </Col>
      //   </Row>
      // </Container>
    );
  }
  
  export default LoginPage;