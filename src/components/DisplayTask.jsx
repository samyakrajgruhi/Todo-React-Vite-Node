import PropTypes from "prop-types";
import './DisplayTask.css';
import editIcon from '../assets/edit-icon.svg';
import trashIcon from '../assets/trash-can.svg';

function DisplayTask({setTasks, tasks}){
   if(tasks.length === 0){
      return (
         <div className="no-task">
            Enter a task by pressing the + icon.
         </div>
      );
   }
      
   function DeleteTask(taskId){
      setTasks(tasks.filter(task => task.id !== taskId));
   }

   return (
      <div className="task-section">
         {tasks.map((task)=>{
            return (
               <div 
                  key={task.id} 
                  className="task-container"
               >
                  <input type="checkbox"/>
                  <div className="task-title">
                     {task.task} 
                  </div>  
                  <button className="edit-button general-button">
                     <img src={editIcon}/>
                  </button>
                  <button 
                     onClick={()=> DeleteTask(task.id)}
                     className="delete-button general-button"
                  >
                     <img src={trashIcon}/>
                  </button>
               </div>
            );
         })}
      </div>
   );
}

DisplayTask.propTypes = {
   setTasks: PropTypes.func.isRequired,
   tasks: PropTypes.arrayOf(
     PropTypes.shape({
       id: PropTypes.number.isRequired,
       task: PropTypes.string.isRequired,
     })
   ).isRequired,
};

export default DisplayTask;