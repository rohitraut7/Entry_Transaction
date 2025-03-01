import styles from "@/app/styles/navbar.module.css" 
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/NavBar/Nav"

const Header = () => {
    return (
        <header className={styles.main_header}>
            <div className={styles.navbar_brand}>
                <Link href="/" >
                </Link>

                <Nav />
            </div>
        </header>
    );
};

export default Header;