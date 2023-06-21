import { useSelector } from "react-redux"
import Header from "../componets/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonList from "../componets/pokedex/PokemonList"





const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)  

 const nameTrainer = useSelector(store => store.nameTrainer)

  const pokemonsBYName = pokemons.filter((pokemon) =>
  pokemon.name.includes(namePokemon.toLocaleLowerCase().trim()))

 const handleSumit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value)
  }
  
  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  const paginacion = () => {
   const POKEMONS_PER_PAGE = 15

   const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPage = pokemonsBYName.slice(sliceStart, sliceEnd)

   const Lastpage = Math.ceil(pokemonsBYName.length / POKEMONS_PER_PAGE) || 1

   const PAGES_PER_BLOCK = 4
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    const pagesInBlock = []
    const minpage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxpage = actualBlock * PAGES_PER_BLOCK
    for (let i = minpage; i <= maxpage; i++) {
      if (i <= Lastpage) {
        pagesInBlock.push(i)
      
      }
    }
      return {pokemonInPage, Lastpage, pagesInBlock }
    
  }


  const { Lastpage, pagesInBlock, pokemonInPage} = paginacion()

  
    const handleClickPreviusPage = () => {  
      const newCurrentPage = currentPage - 1
      if (newCurrentPage >= 1) {
        setCurrentPage(newCurrentPage)
      }
    }

    const handleClickNextPage = () => {
      const newCurrentPage = currentPage + 1
      if (newCurrentPage <= Lastpage) {
        setCurrentPage(newCurrentPage)
      }
    }





 useEffect(() => {
  if(!currentType){
  const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281'

  axios.get(URL)
  .then(({data}) => setPokemons(data.results))
  .catch((err) => console.log(err))
  }
    
 }, [currentType])

 useEffect(() => {
  const url = 'https://pokeapi.co/api/v2/type'

  axios.get(url)
  .then(({data}) => setTypes(data.results))
  .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if(currentType){
      const url = `https://pokeapi.co/api/v2/type/${currentType}`

      axios.get(url)
      .then(({data}) => {
       const pokemonsByType = data.pokemon.map(pokemon => pokemon.pokemon)
        setPokemons(pokemonsByType)
      })
      .catch((err) => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [namePokemon, currentType])



  

  

  return (
    
    <main >
      <Header />
      <p className="text-xl text-left ml-4 mt-8"><span className="font-bold text-red-500">Welcome  {nameTrainer}</span>, here you can find </p>
        
        <form className="grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center p-2" onSubmit={handleSumit}>
          <div className="grid grid-cols-[1fr_28%] mt-6 mb-6"> 
            <input id="namePokemon"  className="bg-slate-50 border-b-4 py-4 text-center text-md" type="text" placeholder="type a name pokemon..." />
            <button className="bg-red-600 text-white" >Search</button>
          </div>

          <select className="bg-slate-50 border-b-4 py-4 mt-6 mb-6 text-md " onChange={handleChangeType}>
            <option  value="">All Pokemon</option>
            {
             types.map((type) => <option value={type.name} key={type.url}>{type.name}</option>)
            }
          </select>

        </form>
        
         <PokemonList pokemons={pokemonInPage}/>
        

      <ul className="flex gap-4 justify-center py-4 px-2 flex-wrap">
        {/* primera pagina  */}
        <li onClick={() => setCurrentPage(1)} className=" p-4 bg-red-400 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>  
        {/* pagina anterior  */}
        <li onClick={handleClickPreviusPage} className=" p-4 bg-red-400 font-bold text-white rounded-md cursor-pointer">{"<"}</li>
        {
          pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} className={`p-3 bg-red-400 font-bold text-white rounded-md cursor-pointer ${page === currentPage && "bg-gray-500"}`} key={page}>{page}</li>)
        }
        {/* pagina siguiente  */}
        <li onClick={handleClickNextPage} className=" p-4 bg-red-400 font-bold text-white rounded-md cursor-pointer">{">"}</li>
        {/* ultima pagina  */}
        <li onClick={() => setCurrentPage(Lastpage)} className=" p-4 bg-red-400 font-bold text-white rounded-md cursor-pointer">{">>"}</li>
      </ul>

    </main>
  )
}
export default Pokedex