import {useState} from 'react';
import DisplayTask from './components/DisplayTask';
import InputSection from './components/InputSection';
import './App.css';

function App(){
   const [tasks,setTasks] = useState([]);

   return (
      <>
         <InputSection 
            tasks={tasks} 
            setTasks={setTasks} 
         />
         <DisplayTask 
            setTasks={setTasks}
            tasks={tasks} 
         />
      </>
   );
}


export default App;