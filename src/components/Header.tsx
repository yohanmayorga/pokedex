import styles from "@/styles/Header.module.css";
import ash from "@/../../public/assets/ash.png";
import logo from "@/../../public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";

export function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="logo" className={styles.logo} priority />
      </Link>

      <div className={styles.info}>
        <Image src={ash} alt="ash" className={styles.image} priority />
        <div>
          <div className={styles.titles}>
            <h1>Pokedex</h1>
            <Link
              href="https://github.com/yohanmayorga/pokedex"
              target="_black"
              className={styles.connect}
            >
              <FiGithub />
            </Link>
            <Link
              href="https://pokeapi.co/"
              target="_black"
              className={styles.connect}
            >
              <IoDocumentTextOutline />
            </Link>
          </div>

          <div>
            <p>
              Simple web application containing the information of
              <strong> 151 Pokemon. </strong>
              The purpose of the application is to demonstrate a simple way to
              obtain and display free information available on the web, through
              the use of <strong>APIs.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
