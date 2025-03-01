import styles from '@/app/styles/navbar.module.css';
import Link from 'next/link';

const Nav = () => {
    return (
        <nav className={styles.navbar}>
            <div>
                <ul className={styles.navbarList}>

                    <li className={styles.navbarItem}>
                        <Link href='/'>
                            Home
                        </Link>
                    </li>

                    <li className={styles.navbarItem}>
                        <Link href='/Contact'>
                            Contact
                        </Link>
                    </li>

                    <li className={styles.navbarItem}>
                        <Link href='/employee'>
                            Employee
                        </Link>
                    </li>

                    <li className={styles.navbarItem}>
                        <Link href='/study_subject'>
                            Study
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Nav;






