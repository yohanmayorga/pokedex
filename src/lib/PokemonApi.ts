const POKEMON_API = "https://pokeapi.co/api/v2/";

interface PokemonGridProps {
  pokemonList: any;
}

export async function getPokemonList() {
  const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
  const data = await response.json();
  return data.results;
}

export async function getPokemon(name: string) {
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}

export async function server() {
  const list = [];
  const mylist = await getPokemonList();
  for (let i = 0; i < mylist.length; i++) {
    const pokemonObject = await getPokemon(mylist[i].name);
    list.push(pokemonObject);
  }
  return list;
}
