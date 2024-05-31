import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";

function App() {
  const [habits, setHabits] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [appID, setAppID] = useState("");
  const [date, setDate] = useState(new Date());

  const [todaysDate, setTodaysDate] = useState("");
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [selectedDayHabits, setSelectedDayHabits] = useState([]);

  // console.log(appID)

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env)
    if (appID) {
      const formatDate = (date) => { 
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
      };

      const formattedDate = formatDate(date);
      
      const url = `${process.env.REACT_APP_API_URL}Habits/${appID}/${formattedDate}`;
      console.log("URL: ", url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setHabits(data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [updater, appID, date]);

useEffect(() => {
  if(loggedIn) {
  const fetchData = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
    setTodaysDate(formattedDate);


    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
    };

    const formattedSelectedDate = formatDate(date);

    
    try {
      const todaysHabitsResponse = await fetch(`${process.env.REACT_APP_API_URL}Habits/${appID}/${formattedDate}`);
      const todaysHabits = await todaysHabitsResponse.json();

      const selectedDayHabitsResponse = await fetch(`${process.env.REACT_APP_API_URL}Habits/${appID}/${formattedSelectedDate}`);
      const selectedDayHabits = await selectedDayHabitsResponse.json();

      todaysHabits.forEach(async (habit) => {
        const habitExists = selectedDayHabits.some((selectedHabit) => selectedHabit.name === habit.name);
        if (!habitExists) {
          const response = await fetch(`${process.env.REACT_APP_API_URL}Habits`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: habit.name,
              userid: appID,
              date: formattedSelectedDate,
            }),
          });

          const data = await response.json();
          console.log("Habit added: ", data);
          setUpdater(!updater);
        }
      });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  

  fetchData();
}
}, [ todaysDate, date]);
  

  

  // form / login handler

  return (
    <div className="App">
      <h1>Habit Tracker</h1>

      <Login
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        habits={habits}
        updater={updater}
        setUpdater={setUpdater}
        appID={appID}
        setAppID={setAppID}
        date={date}
        setDate={setDate}
      />
    </div>
  );
}

export default App;
