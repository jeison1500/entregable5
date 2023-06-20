import axios from "axios"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

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


const pokeborder = {
  grass: "border-green-500",
  fire: "border-red-500",
  water: "border-blue-500",
  bug: "border-green-500",
  normal: "border-gray-500",
  poison: "border-purple-500",
  electric: "border-yellow-500",
  ground: "border-yellow-500",
  fairy: "border-pink-500",
  fighting: "border-red-500",
  psychic: "border-pink-500",
  rock: "border-gray-500",
  ghost: "border-purple-500",
  ice: "border-blue-500",
  dragon: "border-red-500",
  dark: "border-gray-500",
  steel: "border-gray-500",
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



const Pokemoncard = ({pokemonUrl}) => {

  const [pokemon, setPokemon] = useState(null)

  const formatTypesPokemon = (types = []) => {
    const titleTypes = types.map(({type}) => type.name).join(' / ')
    return titleTypes
  }

  

  useEffect(() => {
    axios.get(pokemonUrl)
    .then(({data}) => setPokemon(data))
    .catch((err) => console.log(err))

  }, [])

  

  return (


    <article className={`border-[15px] rounded-2xl ${pokeborder[pokemon?.types[0].type.name]}`} >

      <Link to={`/pokedex/${pokemon?.name}`}>
        <section className={`relative h-40 ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`} >
          <div className="absolute px-12 -bottom-14">
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name}
            />
          </div>
          </section>

           <section>
             <h3 className={`mt-14 text-center font-bold text-[25px] ${text[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
             
              <p className="text-center text-gray-500 text-[14px]">
              {formatTypesPokemon(pokemon?.types)}
              </p>


            <p className="text-center text-gray-500 text-[10px] mb-4">
              Tipo
            </p>

            <hr />


          </section>
          <section className="grid grid-cols-2 gap-10 p-4">
            {
             pokemon?.stats.slice(0, 4).map((stat) => (
              <div key={stat.stat.url}>

              <p className="capitalize text-center text-gray-400 text-[12px]">
                {stat.stat.name}
              </p>
              <p className={`text-center text-[20px] font-bold ${text[pokemon?.types[0].type.name]}`}>
                {stat.base_stat}
              </p>
            </div>
             ))}
                      

        </section>
      </Link>
    </article>
  )
}
export default Pokemoncard