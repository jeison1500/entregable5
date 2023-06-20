import Pokemoncard from "./Pokemoncard"

const PokemonList = ({pokemons}) => {
  return (
    <section className="grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w[1280px] mx-auto"  >
      {
        pokemons.map(pokemon => <Pokemoncard key={pokemon.url} pokemonUrl={pokemon.url}/>)
      }

    </section>
  )
}
export default PokemonList