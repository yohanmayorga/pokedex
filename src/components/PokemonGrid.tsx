"use client";
import styles from "@/styles/PokemonGrid.module.css";
import { useState } from "react";

interface PokemonGridProps {
  pokemonList: any;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");

  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLocaleLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(pokemonList);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchText}
        autoComplete="off"
        id="pokemonName"
        placeholder="Name of the Pokemon"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={styles.cards}>
        {filteredPokemonList.map((pokemon: any) => {
          return (
            <div key={pokemon.id} className={styles.pokemonCard}>
              {pokemon.name} {pokemon.weight}
            </div>
          );
        })}
      </div>
    </div>
  );
}
