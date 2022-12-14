import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const Login = ({ onIdSubmit }) => {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
      onIdSubmit(uuid());
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{
        height: "100vh",
      }}
    >
      <Form className="w-100">
        <Form.Group className="mb-2">
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Button variant="secondary" className="ms-2" onClick={createNewId}>
          Create A New Id
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
