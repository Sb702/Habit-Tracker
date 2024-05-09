import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";

function App() {
  const [habits, setHabits] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [appID, setAppID] = useState("");

useEffect(() => {
  console.log("appID: ", appID)
  if (appID) {
    const url = `http://localhost:3000/Habits/${appID}/2024-05-09`;
    console.log("URL: ", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHabits(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
}, [updater, appID]);

  // console.log("habits coming from App.js state: ", habits);

  // form / login handler

  return (
    <div className="App">
      <h1>Habit Tracker</h1>

      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} habits={habits} updater={updater} setUpdater={setUpdater} appID={appID} setAppID={setAppID} />
    </div>
  );
}

export default App;
