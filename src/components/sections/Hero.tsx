import { APP } from '@/lib/constants';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>{APP.name}</h1>
        <p className={styles.hero__desc}>{APP.description}</p>
      </div>
    </section>
  );
}
