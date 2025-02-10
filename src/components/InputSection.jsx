import PropTypes from "prop-types";
import {useRef,useEffect,useState} from 'react';
import './InputSection.css';
import PlusIcon from '../assets/plus-solid.svg';
import EditIcon from '../assets/edit-icon.svg';
import dayjs from "dayjs";

function InputSection({tasks,setTasks}){
   const taskInputRef = useRef(null);
   const [buttonIcon, setButtonIcon] = useState(PlusIcon);
   const  [currentDate,setCurrentDate] = useState("");

   useEffect(()=>{
      const today = dayjs().format("YYYY-MM-DD");
      setCurrentDate(today);
   },[]);

   function changeDate(event){
      setCurrentDate(event.target.value);
   }

   function AddTask(){
      const taskInputElem = taskInputRef.current;
      if(taskInputElem.value === ''){
         setButtonIcon(EditIcon);
         setTimeout(() => {
            setButtonIcon(PlusIcon);
         }, 1500);
         return;
      }

      setTasks([
         ...tasks,{
            task:taskInputElem.value,
            id:crypto.randomUUID(),
            dueDate:currentDate,
            checked:false

         }
      ]);
      
      taskInputElem.value = '';
   }

   function addWithEnter(event){
      if(event.key === 'Enter'){
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
         <input 
            type="date"
            className="input-date"
            value={currentDate}
            onChange={changeDate}
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
      dueDate: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
   })
).isRequired,
setTasks: PropTypes.func.isRequired
}

export default InputSection;