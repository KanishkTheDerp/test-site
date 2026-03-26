import type { CSSProperties, ReactNode } from 'react';
import styles from './ui.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, className = '', style }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

type BadgeVariant = 'success' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${variant}`]} ${className}`.trim()}>
      {children}
    </span>
  );
}

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
