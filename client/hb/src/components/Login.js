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
import LoggedIn from "./LoggedIn";

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
  const [createUser, setCreateUser] = useState(false);
  const [userdata, setUserdata] = useState({});


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch("http://localhost:3000/users/login", {
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
        if (data._id !== undefined) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };


return (
  loggedIn ? (
    <LoggedIn updater={updater} setUpdater={setUpdater} userdata={userdata} setLoggedIn={setLoggedIn} habits={habits} date={date} setDate={setDate} />
  ) : (
    <div>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <TextField
              id="outlined-basic"
              label="Enter Your Email.."
              variant="outlined"
              name="email"
            />
          </label>
          <label>
            <TextField
              id="outlined-basic"
              label="Enter Your Password.."
              variant="outlined"
              name="password"
            />
          </label>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateUser(true)}
        >
          Create User
        </Button>
        {createUser === true && <CreateUser createUser={createUser} />}
      </div>
    </div>
  )
);
}