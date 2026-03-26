import { Film, Download } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  {
    icon: Film,
    title: 'Media Server',
    description: 'Centralized library for movies, TV shows, and music.',
    color: 'var(--accent-primary)',
    gradient: 'var(--bg-card)',
    status: 'Online',
  },
  {
    icon: Download,
    title: 'Download Manager',
    description: 'Securely manage downloads and file transfers.',
    color: 'var(--accent-primary)',
    gradient: 'var(--bg-card)',
    status: 'Online',
  },
];
