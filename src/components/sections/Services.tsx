import { services } from '@/data/services';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.services__grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.card__icon}>
                <service.icon size={28} />
              </div>

              <h3 className={styles.card__title}>{service.title}</h3>
              <p className={styles.card__desc}>{service.description}</p>

              <div className={styles.card__status}>
                <span className={styles.card__statusDot} />
                <span className={styles.card__statusText}>{service.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
