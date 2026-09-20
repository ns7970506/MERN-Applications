import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ReturnPolicy from './pages/ReturnPolicy'
import Disclaimer from './pages/Disclaimer'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>}></Route>
            <Route path='/return' element={<ReturnPolicy/>}></Route>
            <Route path='/disclaimer' element={<Disclaimer/>}></Route>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App
