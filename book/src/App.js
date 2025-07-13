import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './components/pages/userspecific/Home';
import Landing from './components/pages/Landing';
import { UserFormProvider } from './components/context/UserFormContext';
import { AlertProvider } from './components/context/AlertContext';
import { UserProvider } from './components/context/UserContext';
import ProtectedRoute from './components/user/ProtectedRoute';




function App() {
  return (
    <>
    <UserProvider>
    <AlertProvider>
    <UserFormProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
        </Routes>
      </Router>
      </UserFormProvider>
      </AlertProvider>
      </UserProvider>
    </>
  )
}

export default App;
