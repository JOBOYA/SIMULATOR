import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function FormComponent() {
  const [commercial, setCommercial] = useState('');
  const [montant, setMontant] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      commercial: commercial,
      montant: montant,
    };

    axios.post('http://localhost:5000/FormComponent', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCommercial">
        <Form.Label>Commercial</Form.Label>
        <Form.Control type="text" placeholder="Enter commercial" value={commercial} onChange={(e) => setCommercial(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formMontant">
        <Form.Label>Montant</Form.Label>
        <Form.Control type="number" placeholder="Enter montant" value={montant} onChange={(e) => setMontant(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormComponent;
