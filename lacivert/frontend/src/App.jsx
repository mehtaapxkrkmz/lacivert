import React from 'react'
import Admin from './components/admin/Admin'
import Test from './components/admin/Test'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <>
    <Router>
      <nav>
        <Link to="/admin">admin</Link>
        ----------
        <Link to="/test">test</Link>
      </nav>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App