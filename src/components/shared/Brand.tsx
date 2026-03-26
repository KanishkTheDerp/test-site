import { Cloud } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { BrandProps } from '@/types';
import styles from './Brand.module.css';

const sizeConfig = {
  sm: { icon: 36, radius: 10, fontSize: '1.15rem', gap: '0.6rem' },
  md: { icon: 40, radius: 10, fontSize: '1.3rem', gap: '0.75rem' },
  lg: { icon: 48, radius: 12, fontSize: '1.5rem', gap: '0.75rem' },
};

export default function Brand({ size = 'md' }: BrandProps) {
  const config = sizeConfig[size];

  return (
    <div className={styles.brand} style={{ '--brand-gap': config.gap } as CSSProperties}>
      <div
        className={styles.brand__icon}
        style={{
          width: `${config.icon}px`,
          height: `${config.icon}px`,
          borderRadius: `${config.radius}px`,
        }}
      >
        <Cloud size={Math.round(config.icon * 0.5)} fill="currentColor" />
      </div>
      <span className={styles.brand__text} style={{ fontSize: config.fontSize }}>
        Cloudbox
      </span>
    </div>
  );
}
