import ContactsProvider from "../contexts/ContactsContext";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorage();

  return (
    <>
      {id && (
        <ContactsProvider>
          <Dashboard id={id} />
        </ContactsProvider>
      )}
      {!id && <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
