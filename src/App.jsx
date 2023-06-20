
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonId from './pages/PokemonId'
import ProtectedRoutes from './componets/auth/ProtectedRoutes'

function App() {


  return (
    <section className='font-["Inter"]'>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>

        <Route path="/Pokedex" element={<Pokedex />} />

        <Route path="/Pokedex/:pokemonName" element={<PokemonId />} />

        </Route>



      </Routes>
    </section>
  )
}

export default App
