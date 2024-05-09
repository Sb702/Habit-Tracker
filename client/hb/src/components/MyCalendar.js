import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar({ date, setDate }) {

  const onChange = (date) => {
    setDate(date);
    console.log(date);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Returns date as "YYYY-MM-DD"
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
      />
      <p>{formatDate(date)}</p>  
    </div>
  );
}

export default MyCalendar;