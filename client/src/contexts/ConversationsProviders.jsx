import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContact } from "./ContactsContext";

const ConversationsContext = React.createContext({
  createConversation: (recipients) => {},
  conversations: [],
  selectConversationIndex: (id) => {},
  selectedConversation: {},
  sendMessage: (recipients, text) => {},
});

export function useConversations() {
  return useContext(ConversationsContext);
}

const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setselectedConversationIndex] = useState(0);
  const { contacts } = useContact();

  function createConversation(recipients) {
    setConversations((prevState) => {
      return [
        ...prevState,
        {
          recipients,
          messages: [],
        },
      ];
    });
  }

  function addMessageToConversation({ recipients, text, sender }) {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newCOnversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });

      if (madeChange) {
        return newCOnversations;
      } else {
        return [
          ...prevConversations,
          {
            recipients,
            messsages: [newMessage],
          },
        ];
      }
    });
  }

  function sendMessage(recipients, text) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => contact.id === recipient);
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => contact.id === message.sender);
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return {
        ...message,
        senderName: name,
        fromMe,
      };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    createConversation,
    conversations: formattedConversations,
    selectConversationIndex: setselectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsProvider;

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
}
