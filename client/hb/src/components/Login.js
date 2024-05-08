import {React, useState} from "react";
import Habits from "./Habits";


export default function Login({ loggedIn, setLoggedIn, habits, updater, setUpdater}) {

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
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
          setLoggedIn(true);
      };


  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Logout</h2>
          <button onClick={() => setLoggedIn(false)}>Logout</button>

          <h2>Welcome! {userdata.name}</h2>
          <Habits habits={habits} updater={updater} setUpdater={setUpdater} />
          <ul>
            {habits.map((habit) => (
              <li key={habit.id}>
                <h3>{habit.name}</h3>
                <p>{habit.description}</p>
              </li>
            ))}
          </ul>

        </div>
      ) : (
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
            <button type="submit">Login</button>
          </form>
        </div>
      )}


    </div>
  );
}
