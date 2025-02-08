import PropTypes from "prop-types";
import {useRef,useState} from 'react';
import './InputSection.css';
import PlusIcon from '../assets/plus-solid.svg';
import ErrorIcon from '../assets/plus-solid-animated.svg';

function InputSection({tasks,setTasks}){
   const taskInputRef = useRef(null);
   const [buttonIcon, setButtonIcon] = useState(PlusIcon);

   function AddTask(){
      const taskInputElem = taskInputRef.current;
      if(taskInputElem.value === ''){
         setButtonIcon(ErrorIcon); // Change to error icon
         setTimeout(() => {
            setButtonIcon(PlusIcon);
            console.log('bruh') // Revert back to plus icon after 2 seconds
         }, 2000);
         return;
      }
      setTasks([
         ...tasks,{
            task:taskInputElem.value,
            id:crypto.randomUUID()
         }
      ]);
      taskInputElem.value = '';
   }

   function addWithEnter(event){
     if(event.key === 'Enter'){
      console.log('Enter')
       AddTask();
     }else if(event.key === 'Escape'){
       taskInputRef.value='';
     }
   }

   return (
      <div className="input-container">
         <input 
            type="text" 
            placeholder="Add a Task" 
            ref={taskInputRef}
            onKeyDown={addWithEnter}
            className="input-left-section input-task"
         />
         <button 
            className="add-button"
            onClick={AddTask} 
         ><img src={buttonIcon}/></button>
      </div>
   );
}
 
InputSection.propTypes = {
tasks: PropTypes.arrayOf(
   PropTypes.shape({
      id: PropTypes.number.isRequired,
      task:PropTypes.string.isRequired,
      dueDate:PropTypes.string.isRequired
   })
).isRequired,
setTasks: PropTypes.func.isRequired
}

export default InputSection;