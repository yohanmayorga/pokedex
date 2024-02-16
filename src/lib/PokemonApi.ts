const POKEMON_API = "https://pokeapi.co/api/v2/";

interface PokemonObject {
  id: number;
  name: string;
  weight: number;
  height: number;
  experience: number;
  image: string;
  types: [];
  stats: statObject[];
}

interface statObject {
  baseStat: number;
  name: string;
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
    const typeNames = pokemonObject["types"].map((type: any) => type.type.name);
    const statList = pokemonObject.stats.map((statObject: any) => {
      return {
        baseStat: statObject.base_stat,
        name: statObject.stat.name,
      };
    });
    const pokemonObject2: PokemonObject = {
      id: pokemonObject.id,
      name: pokemonObject.name,
      weight: pokemonObject.weight,
      height: pokemonObject.height,
      experience: pokemonObject.base_experience,
      image: pokemonObject.sprites.other["official-artwork"].front_default,
      types: typeNames,
      stats: statList,
    };
    pokemonList.push(pokemonObject2);
  }
  return pokemonList;
}
