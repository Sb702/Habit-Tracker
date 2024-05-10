import React from "react";

export default function Stats({ habits, date }) {
  // nunber of habits completed
const completedHabits = habits.filter((habit) => habit.complete);


  return (
    <div>
      <h2>Completed Habits</h2>
      {completedHabits.length}
    </div>
  );
}
