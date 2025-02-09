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

   function EditTask(){
      console.log("Edit Task");
   }
      
   function DeleteTask(taskId){
      setTasks(tasks.filter(task => task.id !== taskId));
   }

   function toggleChecked(taskId){
      setTasks(tasks.map( task=>
         task.id === taskId ? {...task,checked: !task.checked} : task
      ));
   }
   
   const sortedTasks = [...tasks].sort((a, b) => a.checked - b.checked);

   return (
      <div className="task-section">
         {sortedTasks.map((task)=>{
            return (
               <div 
                  key={task.id} 
                  className={`task-container ${task.checked ? 'checked' : ''}`}
               >
                  <input 
                     checked={task.checked}
                     type="checkbox"
                     onChange={()=> toggleChecked(task.id)}
                  />
                  <div className={`task-title ${task.checked ? 'checked' : ''}`}>
                     {task.task} 
                  </div>  
                  <button 
                     className="edit-button general-button"
                     onClick={EditTask}
                  >
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