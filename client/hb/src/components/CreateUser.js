import React from 'react'

export default function CreateUser() {

  const handleSubmitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    fetch(`${process.env.REACT_APP_API_URL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "name": name, "email": email, "password": password}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data coming from user fetch: ", data);
      })
      .catch((error) => {
        console.error("There was an error!", error.errmsg);
      });
  }


  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmitUser}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
