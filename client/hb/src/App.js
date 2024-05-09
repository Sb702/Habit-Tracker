import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";

function App() {
  const [habits, setHabits] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [appID, setAppID] = useState("");
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    if (appID) {
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
      };
  
      const formattedDate = formatDate(date);
        
    const url = `http://localhost:3000/Habits/${appID}/${formattedDate}`;
    console.log("URL: ", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHabits(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
}, [updater, appID, date]);

  // console.log("habits coming from App.js state: ", habits);

  // form / login handler

  return (
    <div className="App">
      <h1>Habit Tracker</h1>

      <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} habits={habits} updater={updater} setUpdater={setUpdater} appID={appID} setAppID={setAppID} date={date} setDate={setDate} />
    </div>
  );
}

export default App;
