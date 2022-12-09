import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useContact } from "../contexts/ContactsContext";

const Contacts = () => {
  const { contacts } = useContact();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroupItem key={contact.id}>{contact.name}</ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Contacts;
