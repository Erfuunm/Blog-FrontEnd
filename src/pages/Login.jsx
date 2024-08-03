
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'https://localhost:7282/api/Auth/login'; 

function Login() {
    

     const login = async (email, password) => {
        try {
          const response = await axios.post(`${API_URL}`, { email, password });
          return response.data;
        } catch (error) {
          throw error;
        }
      };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
      };

  
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
        } else {
          setErrors({});
          try {
            const userData = await login(email, password);
            console.log('Login successful:', userData);
            // Here you would typically store the user data and redirect
          } catch (error) {
            setErrors({ form: 'Login failed. Please try again.' });
          }
        }
      };
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                    <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                 <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
              </Form.Group>
  
              <Button onClick={handleSubmit} variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Login;