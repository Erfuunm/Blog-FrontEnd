import Form from 'react-bootstrap/Form';

export default function InputField(
  { name, label, type, placeholder, error, fieldRef }
) {
  return (
    <Form.Group controlId={name} className="InputField mx-5 px-5 ">
      {label && <Form.Label className='text-white '>{label}</Form.Label>}
      <Form.Control
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldRef}
      />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}