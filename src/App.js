import './App.css';
import Form from './components/form/Form';
import Signup from './components/sign-up/Signup';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import {NoteContextProvider} from './NoteContext'
import Profile from './components/profile/Profile';
import { ToastContainer, toast } from 'react-toastify';

const Query = new QueryClient({defaultOptions: {
  queries: {
    refetchOnWindowFocus: true,
    refetchOnMount: true
  }
}})

function App() {
  return (
    <div className="App">
      <NoteContextProvider>
        <QueryClientProvider client={Query}>
        <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/form" element={<Form />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<h1>Oi ! Page not Found!</h1>} />
            </Routes>
        </Router>
        </QueryClientProvider>
      </NoteContextProvider>

      <ToastContainer />

    </div>
  );
}

export default App;



