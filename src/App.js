import './App.css';
import Form from './components/form/Form';
import Signup from './components/sign-up/Signup';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/form" element={<Form />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>Oi ! Page not Found!</h1>} />
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;



