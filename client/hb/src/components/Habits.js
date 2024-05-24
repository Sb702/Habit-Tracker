import {React, useState} from 'react'
import './Habits.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function Habits({ habits, updater, setUpdater, userdata, date}) {
    const [newHabit, setNewHabit] = useState("");
    const [userid, setUserid] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const habit = formData.get("habit");
        // console.log("habit: ", habit);
        setUserid(userdata._id);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
        };
        const formattedDate = formatDate(date);
        // console.log("Submitted Date: ", formattedDate);

        fetch(`${process.env.REACT_APP_API_URL}Habits`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "name": habit, "userid": userid, "date": formattedDate}),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("data coming from habit fetch: ", data);
                setNewHabit(data);
                setUpdater(!updater);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }


  return (
    <div className='habits-form-wrap'>

        <form onSubmit={handleSubmit} className='habits-form'>
            <label>
                <TextField id="outlined-basic" label="Enter Your Habit.." variant="outlined" name="habit" />
                {/* <input type="text" name="habit" /> */}
            </label>
            <Button variant='contained' color='primary' type="submit">Submit</Button>
            {/* <button type="submit">Submit</button> */}
        </form>
    </div>
  )
}
