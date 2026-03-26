import Brand from '../shared/Brand';
import { APP } from '@/lib/constants';
import { socialLinks } from '@/data/socials';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__brand}>
          <Brand size="sm" />
        </div>

        <p className={styles.footer__tagline}>{APP.tagline}</p>

        <div className={styles.footer__socials}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className={styles.footer__socialLink}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        <div className={styles.footer__copyright}>
          © {year} {APP.copyright}
        </div>
      </div>
    </footer>
  );
}
