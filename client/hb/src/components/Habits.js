import {React, useState} from 'react'

export default function Habits({ habits, updater, setUpdater}) {
    const [newHabit, setNewHabit] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const habit = formData.get("habit");
        console.log("habit: ", habit);

        fetch("http://localhost:3000/Habits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "name": habit }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data coming from habit fetch: ", data);
                setNewHabit(data);
                setUpdater(!updater);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }


  return (
    <div>
        Enter Your Habits

        <form onSubmit={handleSubmit}>
            <label>
                Habit:
                <input type="text" name="habit" />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
