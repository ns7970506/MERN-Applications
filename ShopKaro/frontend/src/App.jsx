import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App
