import {useState} from 'react';
import PropTypes from "prop-types";
import './DisplayTask.css';
import editButton from '../assets/edit-icon.svg';
import trashIcon from '../assets/trash-can.svg';
import saveIcon from '../assets/save-icon.svg';
import dayjs from 'dayjs';


function DisplayTask({setTasks, tasks}){
   const [editingTaskId,setEditingTaskId] = useState('');
   const [editedTaskText,setEditedTaskText] = useState('');

   if(tasks.length === 0){
      return (
         <div className="no-task">
            Enter a task by pressing the + icon.
         </div>
      );
   }

   function startEditing(task){
      setEditingTaskId(task.id);
      setEditedTaskText(task.task);
   }

   function saveWithEnter(event){
      if(event.key === 'Enter'){
         saveTask(editingTaskId);
      }
   }

   function saveTask(taskId){
      
      if (editedTaskText === ''){
         DeleteTask(taskId);
      }

      tasks.map((task) => {
         if(task.id === taskId){
            task.task = editedTaskText;
            setEditedTaskText('');
            setEditingTaskId('');
         }
      });
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
            const isEditing = task.id === editingTaskId;
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
                  {isEditing ? (
                     <input 
                        type="text" 
                        value={editedTaskText} 
                        onChange={(e) => setEditedTaskText(e.target.value)}
                        className='edit-input' 
                        onKeyDown={saveWithEnter}
                     />
                  ) : (
                     <div 
                        className={`task-title ${task.checked ? 'checked' : ''}`}
                     >{task.task}</div>
                  )}
                  <div className='dueDate'>
                     {dayjs(task.dueDate).format("DD-MMM-YYYY")}
                  </div>
                  {isEditing ? (
                     <button 
                        onClick={() => saveTask(task.id)} 
                        className="general-button edit-button"

                     ><img src={saveIcon}/>
                     </button>
                  ) : (
                     <button 
                        onClick={() => startEditing(task)}
                        className="general-button edit-button"
                     ><img src={editButton} /></button>
                  )}
                  
                  <button 
                     onClick={()=> DeleteTask(task.id)}
                     className="delete-button general-button"
                  ><img src={trashIcon}/>
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
      dueDate: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
     })
   ).isRequired,
};

export default DisplayTask;