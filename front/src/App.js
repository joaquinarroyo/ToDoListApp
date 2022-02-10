import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from './views/Home';
import {Tasks} from './components/Tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
