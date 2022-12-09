import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import useContact from "../contexts/ContactsContext";

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContact();
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  function handleCheckboxChange(id) {
    setSelectedContactsIds((prevState) => {
      if (prevState.includes(id))
        return prevState.filter((contactId) => contactId !== id);
      else return [...prevState, id];
    });
  }

  function handleSubmit(e) {
    e.preventDefault();


    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
