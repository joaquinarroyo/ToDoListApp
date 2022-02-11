import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {EditFolder} from './components/folder/EditFolder';
import {EditTask} from './components/task/EditTask';
import { Folders } from './components/folder/Folders';
import {Tasks} from './components/task/Tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Folders />} />
        <Route path="/editFolder" element={<EditFolder/>} />
        <Route path="/viewTasks" element={<Tasks/>} />
        <Route path="/editTask" element={<EditTask/>} />
      </Routes>
    </Router>
  )
}

export default App;
