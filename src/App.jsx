import {useState} from 'react';
import DisplayTask from './components/DisplayTask';
import InputSection from './components/InputSection';
import DisplayCalendar from './components/DisplayCalendar';
import './App.css';


function App(){
   const [tasks,setTasks] = useState([]);

   return (
      <>
         <div className='main-container'>
            <InputSection 
               tasks={tasks} 
               setTasks={setTasks} 
            />
            <DisplayTask 
               setTasks={setTasks}
               tasks={tasks} 
            />
         </div>
         <DisplayCalendar tasks={tasks} />
      </>
   );
}

export default App;