import { Routes , Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import Favorits from './favorits'
import Recipes from './Recipes'
import About from './About'
import Register from './Register'
import Login from './Login'

function App() {

  
  return (

    <Routes>
      <Route index element={<Register />} />
      <Route path="/" element={<Navbar />} >
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Recipes/:recipeId" element={<Recipes />} />
      <Route path="/Favorits" element={<Favorits />} />
      <Route path="/about" element={<About />} />
      </Route>
    </Routes>

  )
}

export default App
