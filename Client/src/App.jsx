
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import ReportLost from "./pages/ReportLost"
import ReportFound from './pages/ReportFound'
import HomePage from './pages/Home'
import GetItems from './pages/ItemDetails'
function App() {

    return (
        <BrowserRouter>              
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path='/report-found' element={<ReportFound/>}/>
            <Route path='/home' element={<HomePage/>} />
            <Route path='/getitems' element={<GetItems/>} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
