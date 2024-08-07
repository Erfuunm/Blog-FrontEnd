import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputField from '../components/InputField';


import { useUser } from '../Context/UserProvider';
import { useFlash } from '../Context/FlashProvider';
import { Button, Form } from 'react-bootstrap';



function LoginPage() {
    
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const passwordField = useRef();
  const { login } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const username = usernameField.current.value;
    const password = passwordField.current.value;


    const result = await login(username, password);
    if (result === 'fail') {
      flash('Invalid username or password', 'danger');
    }
    else if (result === 'ok') {
      let next = '/';
      if (location.state && location.state.next) {
        next = location.state.next;
      }
      navigate(next);
    }


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

    return (

   <>
      <h1 className='text-white mt-5 pt-5'>Login</h1>
      <Form onSubmit={onSubmit}>
      <br/>
        <InputField
          name="username" label="Username or email address"
          error={formErrors.username} fieldRef={usernameField} />
          <br/>
        <InputField
          name="password" label="Password" type="password" 
          error={formErrors.password} fieldRef={passwordField} />
        <Button className='mt-5' variant="primary" type="submit">Login</Button>
      </Form>

      <hr />
      <p className='text-white' >Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>

  </>
     
    );
  }
  
  export default LoginPage;