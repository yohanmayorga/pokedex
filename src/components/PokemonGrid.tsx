"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/PokemonGrid.module.css";
import { FaSearch } from "react-icons/fa";
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
  const [showSelected, setShowSelected] = useState(false);
  const [selected, setSelected] = useState({
    image: "",
    name: "",
    weight: "",
    height: "",
    experience: "",
  });

  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLocaleLowerCase())
    );
  };

  const activePokedex = (pokeName: any) => {
    setSelected({
      name: pokeName.name,
      weight: pokeName.weight,
      height: pokeName.height,
      experience: pokeName.experience,
      image: pokeName.image,
    });
    setShowSelected(true);
  };
  const filteredPokemonList = searchFilter(pokemonList);

  return (
    <div className={styles.container}>
      {/*Pokedex*/}
      <div className={styles.pokedexContainer}>
        <div className={styles.pokedexBox}>
          {!showSelected && (
            <div className={styles.emptyBox}>Select a Pokemon</div>
          )}
          {showSelected && (
            <div className={styles.displayBox}>
              <Image
                src={selected.image}
                className={styles.pokedexImage}
                alt="pokedex"
                width={250}
                height={250}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.fullList}>
        {/*Search bar*/}
        <div className={styles.searchbar}>
          <input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Search"
            className={styles.input}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch className={styles.symbol} />
        </div>

        {/*List of Pokemons*/}
        <div className={styles.cards}>
          {filteredPokemonList.map((pokemon: any) => {
            return (
              <div
                key={pokemon.id}
                className={styles.pokemonCard}
                onClick={() => activePokedex(pokemon)}
              >
                <Image
                  src={pokemon.image}
                  alt="photo"
                  width={150}
                  height={150}
                  className={styles.pokePicture}
                />
                <h1 className={styles.pokeName}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h1>

                <div className={styles.experience}>
                  Experience: {pokemon.experience}
                </div>

                <div className={styles.details}>
                  <div>
                    <div className={styles.topDetail}>
                      {formatWeight(pokemon.weight)}
                    </div>
                    <div className={styles.bottomDetail}>Weight</div>
                  </div>
                  <div>
                    <div className={styles.topDetail}>
                      {" "}
                      {formatHeight(pokemon.height)}
                    </div>
                    <div className={styles.bottomDetail}>Height</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
