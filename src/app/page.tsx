import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { PokemonGrid } from "@/components/PokemonGrid";
import { server } from "@/lib/PokemonApi";

export default async function Home() {
  const newlist = await server();
  return (
    <div className={styles.container}>
      <Header />
      <PokemonGrid pokemonList={newlist} />
    </div>
  );
}
