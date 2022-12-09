import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorage();

  return (
    <>
      {id && <Dashboard id={id} />}
      {!id && <Login onIdSubmit={setId} />}
    </>
  );
}

export default App;
