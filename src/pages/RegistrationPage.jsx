import { useState, useNavigate , useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from '../components/InputField'
import { useApi } from '../Context/ApiProvider'



export default function RegistrationPage() {
    const [formErrors, setFormErrors] = useState({});
    const [isRegisterd , setIsRegistered] = useState();
    const [NameCheck , setNameCheck] = useState();
    const firstNameField = useRef();
    const lastNameField = useRef();
    const usernameField = useRef();
    
    const emailField = useRef();
    const passwordField = useRef();
    const password2Field = useRef();
   
    const api = useApi();

    
  
    useEffect(() => {
      usernameField.current.focus();
    }, []);
  
    const onSubmit = async (event) => {
        event.preventDefault();
        if (passwordField.current.value !== password2Field.current.value) {
          setFormErrors({password2: "Passwords don't match"});
        }
        else {
          const data = await api.post('/Auth/register', {
            firstname: firstNameField.current.value,
            lastname: lastNameField.current.value,
            username: usernameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value
          });
          if (!data.ok) {
            setFormErrors(data.body.message);
            setNameCheck(true);

          }
          else {
            setFormErrors({});
            setIsRegistered(true);
           
          }
        }
      };
  
    return (
      <>
           <h1 className='text-white mt-5'>Register</h1>
           <br/>
        <Form onSubmit={onSubmit}>
          <InputField
            name="firstName" label="firstName"
            error={formErrors.firstName} fieldRef={firstNameField} />
          <InputField
            name="lasttName" label="lastName"
            error={formErrors.lasttName} fieldRef={lastNameField} />
          <InputField
          name="username" label="Username"
          error={formErrors.message} fieldRef={usernameField} />
          <InputField
            name="email" label="Email address"
            error={formErrors.email} fieldRef={emailField} />
          <InputField
            name="password" label="Password" type="password"
            error={formErrors.password} fieldRef={passwordField} />
          <InputField
            name="password2" label="Password again" type="password"
            error={formErrors.password2} fieldRef={password2Field} />
            <br/>
            { isRegisterd ? <h5 className='bg-success'>Register was success</h5> : null}
            {NameCheck ? <h5 className='bg-danger'>User is Already Exist</h5> : null }
            <br/>
          <Button variant="primary" type="submit" className='mt-5' >Register</Button>
        </Form>
      
      </>  
    );
  }