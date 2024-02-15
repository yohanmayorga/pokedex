const POKEMON_API = "https://pokeapi.co/api/v2/";

interface PokemonObject {
  id: number;
  name: string;
  weight: number;
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

export async function server(): Promise<PokemonObject[]> {
  const mylist = await getPokemonList();
  const pokemonList: PokemonObject[] = [];

  for (let i = 0; i < mylist.length; i++) {
    const pokemonObject = await getPokemon(mylist[i].name);
    const pokemonObject2: PokemonObject = {
      id: pokemonObject.id,
      name: pokemonObject.name,
      weight: pokemonObject.weight,
    };
    pokemonList.push(pokemonObject2);
  }
  return pokemonList;
}
