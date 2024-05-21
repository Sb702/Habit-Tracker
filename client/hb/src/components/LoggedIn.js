import { useState } from "react"
import {
    Button,
    TextField,
    Typography,
    ListItem,
    ListItemText,
    Switch,
    Fab,
  } from "@mui/material";
import Calendar from "react-calendar";
import Habits from "./Habits";
import DeleteIcon from "@mui/icons-material/Delete";
import Stats from "./Stats";




export default function LoggedIn({ setLoggedIn, habits, updater, setUpdater, userdata, date, setDate}) {
    const [createhabit, setCreateHabit] = useState(false);
  





    const handleDelete = (habit) => {
        return () => {
          fetch(`http://localhost:3000/Habits/${habit._id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("data coming from delete fetch: ", data);
              setUpdater(!updater);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        };
      };
    
      const handleComplete = (habit) => {
        return () => {
          fetch(`http://localhost:3000/Habits/${habit._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ complete: !habit.complete }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("data coming from complete fetch: ", data);
              setUpdater(!updater);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        };
      };
    
      function handleCreateClick() {
        setCreateHabit(!createhabit);
      }
    


  return (
    <div>
        <div>
          <div className="logout-header">
            <Button variant="contained" color="primary" onClick={() => setLoggedIn(false)}> Logout </Button>

            <h2>Welcome! {userdata.name}</h2>
          </div>
          <div className="habits-container">
            <div className="habits-calendar">
              <Calendar date={date} setDate={setDate} />
            </div>

            <div className="habits-wrap">
              {/* <Habits
                habits={habits}
                updater={updater}
                setUpdater={setUpdater}
                userdata={userdata}
                date={date}
              /> */}

              {/* <button onClick={handleCreateClick}>Create Habit</button>  */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
              >
                Create Habit
              </Button>
              {createhabit === true && (
                <Habits
                  habits={habits}
                  updater={updater}
                  setUpdater={setUpdater}
                  userdata={userdata}
                  date={date}
                />
              )}

              <ul className="habits-list">
                {habits.map((habit) => (
                  <ListItem
                    key={habit._id}
                    className={habit.complete ? "habit-complete" : "habit"}
                  >
                    <ListItemText variant="h3">{habit.name}</ListItemText>

                    <ListItemText variant="p">{habit.date}</ListItemText>

                    <Switch
                      checked={habit.complete}
                      onChange={handleComplete(habit)}
                    />
                    <Fab
                      color="secondary"
                      aria-label="delete"
                      onClick={handleDelete(habit)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </ListItem>
                ))}
              </ul>
            </div>
          </div>

          <div className="stats-container">
            <Stats habits={habits} date={date} />
          </div>
        </div>
    </div>
  )
}
