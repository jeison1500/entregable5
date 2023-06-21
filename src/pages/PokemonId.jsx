import { useParams } from "react-router-dom"
import Header from "../componets/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"



const pokeLinearGradiendts = {
  grass: "bg-gradient-to-t from-black to-green-500",
  fire: "bg-gradient-to-t from-black to-red-500",
  water: "bg-gradient-to-t from-black to-blue-500",
  bug: "bg-gradient-to-t from-black to-green-500",
  normal: "bg-gradient-to-t from-black to-gray-500",
  poison: "bg-gradient-to-t from-black to-purple-500",
  electric: "bg-gradient-to-t from-black to-yellow-500",
  ground: "bg-gradient-to-t from-black to-yellow-500",
  fairy: "bg-gradient-to-t from-black to-pink-500",
  fighting: "bg-gradient-to-t from-black to-red-500",
  psychic: "bg-gradient-to-t from-black to-pink-500",
  rock: "bg-gradient-to-t from-black to-gray-500",
  ghost: "bg-gradient-to-t from-black to-purple-500",
  ice: "bg-gradient-to-t from-black to-blue-500",
  dragon: "bg-gradient-to-t from-black to-red-500",
  dark: "bg-gradient-to-t from-black to-gray-500",
  steel: "bg-gradient-to-t from-black to-gray-500",
  
}

const text = {
  grass: "text-green-500",
  fire: "text-red-500",
  water: "text-blue-500",
  bug: "text-green-500",
  normal: "text-gray-500",
  poison: "text-purple-500",
  electric: "text-yellow-500",
  ground: "text-yellow-500",
  fairy: "text-pink-500",
  fighting: "text-red-500",
  psychic: "text-pink-500",
  rock: "text-gray-500",
  ghost: "text-purple-500",
  ice: "text-blue-500",
  dragon: "text-red-500",
  dark: "text-gray-500",
  steel: "text-gray-500",

}


const PokemonId = () => {

  const [pokemon, setPokemon] = useState(null)

  const { pokemonName } = useParams()

  const percentProgresStat = (baseStat) => {
    const STAT_MAX  = 255
    return `${(baseStat * 100) / 255}%`

  }


  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    axios.get(url)
      .then(({ data }) => {
        setPokemon(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <main>
      <Header />

      <section className="p-5" >
        {/* imagen del pokemon */}
        <section className={`flex justify-center relative h-20 mt-52  ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`} >
          <img className=" absolute px-12 bottom-4" src={pokemon?.sprites.other.dream_world.front_default} alt={pokemon?.name} />
        </section>

        {/* numero del pokemon */}

        <section className="flex justify-center" >
          <p className="text-center text-gray-500 text-[40px] border-gray-200 border-4 mt-4">#{pokemon?.id}</p>
        </section>


        {/* nombre del pokemon */}
        <section className="flex justify-center" >
          <h2 className={`text-center text-[45px] font-bold ${text[pokemon?.types[0].type.name]} `} >{pokemon?.name}</h2>
        </section>

        {/* peso y altura */}
        <section className="grid grid-cols-2 gap-8 text-center font-bold mt-4"  >        
             <div >
            <p>Peso</p>          
            {pokemon?.weight} kg  
            </div>
            <div>
            <p>Altura</p>
            {pokemon?.height} m            
            </div>
        </section>
        

        {/* tipos del pokemon */}
        <section className="text-center mt-8 grid grid-cols-1 w-[150px] mx-auto" >
          <span>Tipos</span>
          <p className={` text-white text-[14px] py-3   ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`}>
            {
              pokemon?.types.map(({ type }) => type.name).join(' / ')
            }
          </p>
        </section>

        {/* detalle del pokemon */}

        <article>


          {/* stats */}
          <section className="px-2 mt-24" >
            <h2 className="text-4xl ">Stats</h2>
            <section>
              {
                pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url} >
                    <section className="grid grid-cols-2 p-1 ">
                      <h3 className="mt-4">{stat.stat.name}</h3>
                      <p className="text-end mt-4">{stat.base_stat} / 255</p>
                    </section>
                    {/* barra de progreso de stat */}

                    <div className="bg-gray-300 h-8 rounded-md overflow-hidden " >
                      <div style={{width: percentProgresStat(stat.base_stat)}} className="h-full bg-yellow-400 w-[50%]"  ></div>
                    </div>

                  </article>
                ))
              }

            </section>

          </section>

        </article>
      </section>
    </main>
  )
}
export default PokemonId