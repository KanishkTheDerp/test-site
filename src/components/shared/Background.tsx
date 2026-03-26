import styles from './Background.module.css';

export default function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.background__glow} />
      <div className={styles.background__dots} />
    </div>
  );
}
