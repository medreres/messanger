import ContactsProvider from "../contexts/ContactsContext";
import ConversationsProvider from "../contexts/ConversationsProviders";
import SocketProvider from "../contexts/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorage();

  return (
    <>
      {id && (
        <SocketProvider id={id}>
          <ContactsProvider>
            <ConversationsProvider id={id}>
              <Dashboard id={id} />
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      )}
      {!id && <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
