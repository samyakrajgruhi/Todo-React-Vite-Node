import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import { useState } from "react";
import './DisplayTask.css';


export default function DisplayCalendar({tasks}){
   const [selectedDate,setSelectedDate] = useState(new Date());
   console.log(selectedDate);
   const getTileContent = ({ date, view }) => {
      if (view === "month") {
        const formattedDate = dayjs(date).format("DD-MM-YYYY");
        const tasksForDate = tasks.filter(task => task.dueDate === formattedDate);
        return (
          <div>
            {tasksForDate.map(task => (
              <div key={task.id} className= {`task-title ${task.checked ? 'checked' : ''}`}>
                {task.task}
              </div>
            ))}
          </div>
        );
      }
      return null;
   };
  
   const handleDateChange = date => {
      setSelectedDate(date);
   }

   const formattedSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
   console.log("Selected Date:", formattedSelectedDate);
   const tasksForSelectedDate = tasks.filter(task => task.dueDate === formattedSelectedDate);
   console.log("Tasks for Selected Date:", tasksForSelectedDate);

   return (
      <div>
      <Calendar onChange={handleDateChange} value={selectedDate} tileContent={getTileContent} />
      <div style={{ marginTop: '20px' }}>
        <h2>Tasks for {dayjs(selectedDate).format("MMMM D, YYYY")}</h2>
        <ul>
          {tasksForSelectedDate.map(task => (
            <li key={task.id} className= {`task-title ${task.checked ? 'checked' : ''}`}>
              {task.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
   );
    
}

DisplayCalendar.propTypes = {
   tasks: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         task: PropTypes.string.isRequired,
         dueDate: PropTypes.string.isRequired,
         checked: PropTypes.bool.isRequired
      })
   ).isRequired,
};