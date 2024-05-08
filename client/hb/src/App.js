import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);

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

  console.log("habits coming from App.js state: ", habits);

  return (
    <div className="App">
      <h1>Habit Tracker</h1>

    </div>
  );
}

export default App;
