import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './components/NavBar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Admin from './components/Admin'
import Report from './components/Report'
import ShowData from './components/ShowData'
import Login from './components/Login'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <NavBar/>
  <Routes>
    
    <Route path='/' element={ <App />}></Route>
    <Route path='/admin' element={ <Admin />}></Route>
    <Route path='/showdata' element={ <ShowData />}></Route>
    <Route path='/report' element={ <Report />}></Route>
    <Route path='/login' element={ <Login />}></Route>
  </Routes>
  </BrowserRouter>,
)
