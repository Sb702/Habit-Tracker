import { React, useState } from "react";
import Habits from "./Habits";
import CreateUser from "./CreateUser";
import "./Login.css";
import Calendar from "./MyCalendar";
import Stats from "./Stats";
import {
  Button,
  TextField,
  Typography,
  ListItem,
  ListItemText,
  Switch,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Login({
  loggedIn,
  setLoggedIn,
  habits,
  updater,
  setUpdater,
  appID,
  setAppID,
  date,
  setDate,
}) {
  const [userdata, setUserdata] = useState({});
  const [createUser, setCreateUser] = useState(false);
  const [createhabit, setCreateHabit] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch(`${process.env.API_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data coming from login fetch: ", data);
        setUserdata(data);
        setAppID(data._id);
        if(data._id !== undefined) {
          setLoggedIn(true);
        }
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDelete = (habit) => {
    return () => {
      fetch(`${process.env.API_URL}Habits/${habit._id}`, {
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
      fetch(`${process.env.API_URL}Habits/${habit._id}`, {
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
      {loggedIn ? (
        // Logged in display
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
      ) : (
        // Not logged in display
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              {/* <input type="text" name="email" /> */}
              <TextField
                id="outlined-basic"
                label="Enter Your Email.."
                variant="outlined"
                name="email"
              />
            </label>
            <label>
              {/* <input type="password" name="password" /> */}
              <TextField
                id="outlined-basic"
                label="Enter Your Password.."
                variant="outlined"
                name="password"
              />
            </label>
            {/* <button className="btn" type="submit"> */}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            {/* Login
            </button> */}
          </form>
          {/* <button className="btn" onClick={() => setCreateUser(true)}> */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateUser(true)}
          >
            Create User
          </Button>
          {/* Create User
          </button> */}
          {createUser === true && <CreateUser createUser={createUser} />}
        </div>
      )}
    </div>
  );
}
