import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [date, setDate] = React.useState(new Date());

  const onChange = (date) => {
    setDate(date);
    console.log(date);
  };


  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
      />
      <p>{date.toDateString()}</p>  
    </div>
  );
}

export default MyCalendar;