import {useState} from 'react';
import DisplayTask from './components/DisplayTask';
import InputSection from './components/InputSection';

import './App.css';


function App(){
   const [tasks,setTasks] = useState([]);

   return (
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
   );
}

export default App;