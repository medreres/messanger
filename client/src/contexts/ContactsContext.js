import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext({
  createContact: (id, name) => {},
  contacts: [],
});

export function useContact() {
  return useContext(ContactsContext);
}

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevState) => {
      return [
        ...prevState,
        {
          id,
          name,
        },
      ];
    });
  }

  return (
    <ContactsContext.Provider
      value={{
        createContact,
        contacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
