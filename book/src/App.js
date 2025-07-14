import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './components/pages/userspecific/Home';
import Landing from './components/pages/Landing';
import { UserFormProvider } from './components/context/UserFormContext';
import { AlertProvider } from './components/context/AlertContext';
import { UserProvider } from './components/context/UserContext';
import ProtectedRoute from './components/user/ProtectedRoute';
import Accounting from './components/pages/userspecific/Accounting';
import Scheduler from './components/pages/userspecific/Scheduler';
import Doodler from './components/pages/userspecific/Doodler';
import Logger from './components/pages/userspecific/Logger';
import Navbarcomponent from './components/pages/Navbarcomponent';
import User from './components/pages/userspecific/User';
import { TransactionProvider } from './components/context/TransactionContext';
import { ModalProvider } from './components/context/ModalContext';


function App() {
  const [nav, setNav] = useState(true)
  return (
    <>
      <UserProvider>
        <TransactionProvider>
          <AlertProvider>
            <ModalProvider>


              <UserFormProvider>
                <Router>
                  <div className="navToggle">
                    <button onClick={() => setNav(prev => !prev)}>☰</button>
                  </div>

                   
                   { nav && <Navbarcomponent />}
                   
                  
                  <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/home' element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    } />
                    <Route path='/user' element={
                      <ProtectedRoute>
                        <User />
                      </ProtectedRoute>
                    } />
                    <Route path='/accounting' element={
                      <ProtectedRoute>
                        <Accounting />
                      </ProtectedRoute>
                    } />
                    <Route path='/scheduler' element={
                      <ProtectedRoute>
                        <Scheduler />
                      </ProtectedRoute>
                    } />
                    <Route path='/doodler' element={
                      <ProtectedRoute>
                        <Doodler />
                      </ProtectedRoute>
                    } />
                    <Route path='/logger' element={
                      <ProtectedRoute>
                        <Logger />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Router>
              </UserFormProvider>


            </ModalProvider>
          </AlertProvider>
        </TransactionProvider>
      </UserProvider>
    </>
  )
}

export default App;
