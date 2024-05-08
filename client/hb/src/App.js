import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";

function App() {
  const [habits, setHabits] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/habits")
      .then((response) => response.json())
      .then((data) => {
        setHabits(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // console.log("habits coming from App.js state: ", habits);

  // form / login handler

  return (
    <div className="App">
      <h1>Habit Tracker</h1>

      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} habits={habits} />
    </div>
  );
}

export default App;
