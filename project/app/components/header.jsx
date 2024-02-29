"use client";
import { useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/modules/header.module.scss";
import MenuPage from "@/app/components/menu/MenuPage";
import logo from "../public/image/logo.png";

import { Bell, Menu, Search } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const segment = useSelectedLayoutSegments();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/home">
            <Image src={logo} alt="." width={30} height={30} priority />
          </Link>
        </div>
        <div className={styles.menu_container}>
          <div className={styles.menu}>
            <Link href="/notification">
              {segment[1] === "notification" ? (
                <>
                  <Bell />
                </>
              ) : (
                <>
                  <Bell />
                </>
              )}
            </Link>
            <Link href="/search">
              {segment[1] === "search" ? (
                <>
                  <Search />
                </>
              ) : (
                <>
                  <Search />
                </>
              )}
            </Link>
            <div onClick={toggleMenu}>
              {segment[1] === "menu" ? (
                <>
                  <Menu />
                </>
              ) : (
                <>
                  <Menu />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <MenuPage
          isOpen={isMenuOpen}
          onClose={closeMenu}
        />
      )}
    </>
  );
};

export default Header;
