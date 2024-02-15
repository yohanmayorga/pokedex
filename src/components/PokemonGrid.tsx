"use client";
import styles from "@/styles/PokemonGrid.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

interface PokemonGridProps {
  pokemonList: any;
}

function formatWeight(weight: any) {
  const weightNumber = Number(weight);
  const weightKg = weightNumber / 10;
  const formattedWeight = weightKg.toFixed(1);
  return `${formattedWeight} Kg`;
}
function formatHeight(height: any) {
  const heightNumber = Number(height);
  const heightMt = heightNumber / 10;
  const formattedHeight = heightMt.toFixed(1);
  return `${formattedHeight} Mt`;
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
      {/*Search bar*/}
      <div className={styles.searchbar}>
        <input
          type="text"
          value={searchText}
          autoComplete="off"
          id="pokemonName"
          placeholder="Name of the Pokemon"
          className={styles.input}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FaSearch className={styles.symbol} />
      </div>
      <div className={styles.cards}>
        {filteredPokemonList.map((pokemon: any) => {
          return (
            <div key={pokemon.id} className={styles.pokemonCard}>
              <Image
                src={pokemon.image}
                alt="photo"
                width={120}
                height={120}
                className={styles.pokePicture}
              />
              <h1 className={styles.pokeName}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h1>

              <div className={styles.experience}>
                Experience: {pokemon.base_experience}
              </div>

              <div className={styles.details}>
                <div>
                  <div className={styles.topDetail}>{pokemon.weight}</div>
                  <div className={styles.bottomDetail}>Weight</div>
                </div>
                <div>
                  <div className={styles.topDetail}>{pokemon.height}</div>
                  <div className={styles.bottomDetail}>Height</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
