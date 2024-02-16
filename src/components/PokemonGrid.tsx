"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/PokemonGrid.module.css";
import { FaSearch } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import pokeball from "@/../../public/assets/pokeball.png";
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
  const [showpokeball, setShowpokeball] = useState(false);
  const [mobilebox, setMobileBox] = useState(false);
  const [selected, setSelected] = useState({
    id: "",
    image: "",
    name: "",
    weight: "",
    height: "",
    experience: "",
    types: [],
    stats: [],
  });

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [callback]);
    return ref;
  };
  const ref = useOutsideClick(() => {
    setMobileBox(false);
  });

  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLocaleLowerCase())
    );
  };

  const activePokedex = (pokeName: any) => {
    setSelected({
      id: pokeName.id,
      name: pokeName.name,
      weight: pokeName.weight,
      height: pokeName.height,
      experience: pokeName.experience,
      image: pokeName.image,
      types: pokeName.types,
      stats: pokeName.stats,
    });
    setShowSelected(true);
    setMobileBox(true);
  };
  const filteredPokemonList = searchFilter(pokemonList);

  return (
    <div className={styles.container}>
      {/*Pokedex*/}
      <div className={styles.pokedexContainer}>
        <div className={styles.pokedexBox}>
          {/*Inactive*/}
          {!showSelected && (
            <div className={styles.pokedexABox}>
              <Image
                src={pokeball}
                className={styles.pokedexImage}
                alt="pokedex"
                width={250}
                height={250}
                style={{ padding: "1rem" }}
              />
              <h1 className={styles.pokedexATitle}>Pokedex</h1>
              <p className={styles.pokedexText}>
                Select a <strong>Pokémon </strong>from the list {<br />}to
                <strong> see more details </strong>such as its <br />
                experience, types, and all <br />
                its statistics.
              </p>
            </div>
          )}

          {/*Active*/}
          {showSelected && (
            <div className={styles.pokedexABox}>
              <Image
                src={selected.image}
                className={styles.pokedexImage}
                alt="pokedex"
                width={250}
                height={250}
              />
              <div className={styles.pokeContent}>
                {/*Title and experience*/}
                <h1 className={styles.pokedexATitle}>
                  {selected.name.charAt(0).toUpperCase() +
                    selected.name.slice(1)}
                </h1>
                <RiBarChart2Fill /> Experience: {selected.experience}
                {/*Detailed info*/}
                <div className={styles.pokeInfo}>
                  <div className={styles.infoSplit}>
                    <div className={styles.infoTop}>
                      {formatWeight(selected.weight)}
                    </div>
                    <div className={styles.infoBottom}>Weight</div>
                  </div>

                  <div className={styles.infoSplit}>
                    <div className={styles.pokedexAExp}>
                      {selected.types.map((type: any) => {
                        return (
                          <div
                            key={selected.types[type.name]}
                            className={styles.infoTop}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.infoBottom}>Type</div>
                  </div>

                  <div className={styles.infoSplit}>
                    <div className={styles.infoSplit}>
                      <div className={styles.infoTop}>
                        {formatHeight(selected.height)}
                      </div>
                      <div className={styles.infoBottom}>Height</div>
                    </div>
                  </div>
                </div>
                {/*Stats*/}
                {selected.stats.map((statobject: any) => {
                  const statName = statobject.name;
                  const statValue = statobject.baseStat;
                  return (
                    <div key={statName} className={styles.statContent}>
                      <div
                        className={styles.statInfo}
                        style={{ width: `${statValue}%` }}
                      >
                        {statName.charAt(0).toUpperCase() + statName.slice(1)}:{" "}
                        {statValue}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/*Pokedex Mobile*/}
      {mobilebox && (
        <div className={styles.mobileContainer} ref={ref}>
          {!showSelected && (
            <div className={styles.pokedexABox}>
              <MdClose
                className={styles.close}
                onClick={() => setMobileBox(false)}
              />
              <Image
                src={pokeball}
                className={styles.pokedexImage}
                alt="pokedex"
                width={200}
                height={200}
                style={{ padding: "1rem" }}
              />
              <h1 className={styles.pokedexATitle}>Pokedex</h1>
              <p className={styles.pokedexText}>
                Select a <strong>Pokémon </strong>from the list {<br />}to
                <strong> see more details </strong>such as its <br />
                experience, types, and all <br />
                its statistics.
              </p>
            </div>
          )}

          {showSelected && (
            <div className={styles.pokedexABox}>
              <MdClose
                className={styles.close}
                onClick={() => setMobileBox(false)}
              />
              <Image
                src={selected.image}
                className={styles.pokedexImage}
                alt="pokedex"
                width={200}
                height={200}
              />
              <div className={styles.pokeContent}>
                {/*Title and experience*/}
                <h1 className={styles.pokedexATitle}>
                  {selected.name.charAt(0).toUpperCase() +
                    selected.name.slice(1)}
                </h1>
                <RiBarChart2Fill /> Experience: {selected.experience}
                {/*Detailed info*/}
                <div className={styles.pokeInfo}>
                  <div className={styles.infoSplit}>
                    <div className={styles.infoTop}>
                      {formatWeight(selected.weight)}
                    </div>
                    <div className={styles.infoBottom}>Weight</div>
                  </div>

                  <div className={styles.infoSplit}>
                    <div className={styles.pokedexAExp}>
                      {selected.types.map((type: any) => {
                        return (
                          <div
                            key={selected.types[type.name]}
                            className={styles.infoTop}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.infoBottom}>Type</div>
                  </div>

                  <div className={styles.infoSplit}>
                    <div className={styles.infoSplit}>
                      <div className={styles.infoTop}>
                        {formatHeight(selected.height)}
                      </div>
                      <div className={styles.infoBottom}>Height</div>
                    </div>
                  </div>
                </div>
                {/*Stats*/}
                {selected.stats.map((statobject: any) => {
                  const statName = statobject.name;
                  const statValue = statobject.baseStat;
                  return (
                    <div key={statName} className={styles.statContent}>
                      <div
                        className={styles.statInfo}
                        style={{ width: `${statValue}%` }}
                      >
                        {statName.charAt(0).toUpperCase() + statName.slice(1)}:{" "}
                        {statValue}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/*Pokeball for mobile*/}
      <Image
        src={pokeball}
        alt="pokedex"
        width={50}
        height={50}
        className={styles.activeMobile}
        onClick={() => setMobileBox(true)}
      />

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
