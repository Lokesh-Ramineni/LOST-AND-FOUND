
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import ReportLost from "./pages/ReportLost"
import ReportFound from './pages/ReportFound'
import HomePage from './pages/Home'

function App() {

    return (
          <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path='/report-found' element={<ReportFound/>}/>
            <Route path='/home' element={<HomePage/>} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
