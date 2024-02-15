import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { PokemonGrid } from "@/components/PokemonGrid";
import { Random } from "@/components/Random";
import { server } from "@/lib/PokemonApi";
import { getPokemonList } from "@/lib/PokemonApi";

export default async function Home() {
  const pokemonList = await getPokemonList();
  const newlist = await server();
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Random />
        <PokemonGrid pokemonList={newlist} />
      </div>
    </>
  );
}
