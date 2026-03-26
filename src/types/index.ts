import type { LucideIcon } from 'lucide-react';

export type BrandSize = 'sm' | 'md' | 'lg';

export interface BrandProps {
  size?: BrandSize;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
  status: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}
