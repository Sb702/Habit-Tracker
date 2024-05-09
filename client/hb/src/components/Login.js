import { React, useState } from "react";
import Habits from "./Habits";
import CreateUser from "./CreateUser";
import "./Login.css";
import Calendar from "./MyCalendar";

export default function Login({
  loggedIn,
  setLoggedIn,
  habits,
  updater,
  setUpdater,
  appID,
  setAppID,
}) {
  const [userdata, setUserdata] = useState({});
  const [createUser, setCreateUser] = useState(false);

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
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDelete = ( habit) => {
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
  }

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
  }

  return (
    <div>
      {loggedIn ? (
        // Logged in display
        <div>
          <div className="logout-header">
            <button className="btn" onClick={() => setLoggedIn(false)}>Logout</button>
          <h2>Welcome! {userdata.name}</h2>
          </div>
<div className="habits-container">

          <div className="habits-calendar">
            <Calendar />
            </div>

<div className="habits-wrap">
          <Habits
            habits={habits}
            updater={updater}
            setUpdater={setUpdater}
            userdata={userdata}
          />
          <ul className="habits-list">
            {habits.map((habit) => (
              <li key={habit._id} className={habit.complete ? "habit-complete" : "habit"}>
          <h3>{habit.name}</h3>
          <button onClick={handleComplete(habit)}>Complete</button>
          <button className="delete-btn" onClick={handleDelete(habit)}>Delete</button>
              </li>
            ))}
          </ul>
          </div>
</div>

        </div>
            ) : (
        // Not logged in display
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="text" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button className="btn" type="submit">Login</button>
          </form>
          <button className="btn" onClick={() => setCreateUser(true)}>Create User</button>
          {createUser === true && <CreateUser createUser={createUser} />}
        </div>
      )}
    </div>
  );
}
