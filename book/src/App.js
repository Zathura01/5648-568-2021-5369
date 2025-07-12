import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './components/pages/userspecific/Home';
import Landing from './components/pages/Landing';
import { UserFormProvider } from './components/context/UserFormContext';





function App() {
  return (
    <>
    <UserFormProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
      </UserFormProvider>
    </>
  )
}

export default App;
