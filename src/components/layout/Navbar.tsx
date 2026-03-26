import Brand from '../shared/Brand';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__glass} aria-hidden="true" />
      <div className={`container ${styles.navbar__inner}`}>
        <Brand size="md" />
      </div>
    </nav>
  );
}
