# Cloudbox: The Ultimate Cloud Media Experience

Cloudbox is a self-hosted media hub dashboard for managing two cloud services: **Jellyfin** (Media Server) and **Torrent** (Download Manager). The dashboard provides a clean interface to monitor downloads, browse recent media, and access services.

## Core Vision
- **Simplicity:** A clean, minimal dashboard interface that prioritizes content and ease of use.
- **Performance:** High-speed streaming and downloading capabilities powered by cloud infrastructure.
- **Accessibility:** Self-hosted and accessible from anywhere.
- **Aesthetics:** A premium, modern design with bold typography and smooth animations.

## Technical Goals
- **Next.js App Router:** Modern React framework with App Router architecture.
- **Single Page App (SPA):** A fluid, fast-loading dashboard experience.
- **Responsive Design:** Optimized for all devices, from mobile to desktop.
- **Server Components First:** Use `'use client'` only when needed (hooks, event handlers, browser APIs).

## Design System

### Color Palette
```css
--bg-dark: #050508;           /* Primary background */
--bg-darker: #0A0A0F;         /* Darker background (footer) */
--bg-card: rgba(255, 255, 255, 0.03);
--accent-primary: #FF6B35;     /* Coral/Sunset Orange */
--accent-secondary: #8B5CF6;   /* Electric Purple */
--accent-tertiary: #06B6D4;   /* Cyan */
--accent-green: #10B981;      /* Success/Online */
--accent-gold: #F59E0B;       /* Gold */
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.6);
--text-muted: rgba(255, 255, 255, 0.4);
--card-border: rgba(255, 255, 255, 0.08);
--glass-bg: rgba(10, 10, 15, 0.7);
```

### Typography
- **Font Family:** Space Grotesk (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800
- **Usage:** Headlines use 700-800 weight, body uses 400-500

### Component Patterns

#### Buttons
```css
.btn-primary {
  background: linear-gradient(135deg, var(--accent-primary) 0%, #FF8F6B 100%);
  color: var(--bg-darker);
  padding: 1rem 2rem;
  border-radius: 14px;
  font-weight: 700;
  transition: var(--transition-fast);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.4);
}
```

#### Glassmorphism
```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--card-border);
}
```

### Animations
- **Status Pulse:** Green pulsing dot for "Online" status (2s infinite)
- **GSAP:** Used for scroll-triggered animations in ServiceCards and staggered text in DashboardHeader

### Layout Structure

#### Navbar
- Fixed position with scroll-triggered glassmorphism (CSS class toggle)
- Brand component (shared icon + text)

#### Dashboard Header
- Centered layout
- GSAP staggered text animation
- Title: "Cloudbox" with description

#### Service Cards
- 2 cards in a row (grid: 1fr 1fr), single column on mobile
- Each card has:
  - Icon container with colored glow (coral for Jellyfin, cyan for Torrent)
  - Gradient background based on accent color
  - CSS hover animation with border color change and translateY
  - Status indicator (green pulsing dot + "Online")

#### Footer
- Centered layout with Brand component, tagline, social links
- Social links: Telegram, GitHub
- Copyright notice

## File Structure
```
src/
├── app/
│   ├── globals.css          # CSS variables, reset, classes, animations, responsive
│   ├── layout.tsx           # Root layout with metadata (Server Component)
│   └── page.tsx             # Main page composition (Server Component)
├── components/
│   ├── Brand.tsx            # Shared brand/logo component (Server)
│   ├── PageBackground.tsx   # Animated blob background (Client)
│   ├── Navbar.tsx           # Glassmorphism navbar with Brand (Client)
│   ├── DashboardHeader.tsx  # Centered title + description (Client)
│   ├── ServiceCards.tsx     # Jellyfin + Torrent cards (Server)
│   └── Footer.tsx           # Footer with Brand + socials (Server)
├── data/
│   ├── services.ts          # Service card data (Jellyfin, Torrent)
│   └── socials.ts           # Social links data (Telegram, GitHub)
├── hooks/
│   ├── useGsapStaggerIn.ts  # GSAP stagger animation hook
│   └── useGsapScrollReveal.ts # GSAP scroll reveal hook
├── lib/
│   └── constants.ts         # App-wide constants (name, tagline, etc.)
├── theme/
│   └── tokens.ts            # Design tokens (colors, gradients)
└── types/
    └── index.ts             # Shared TypeScript types
```

## Development Commands
```bash
npm run dev     # Start development server
npm run build   # Build for production
```

## Dependencies
- **Framework:** Next.js 16.x with App Router
- **UI:** React 19.x
- **Animations:** GSAP 3.x (ScrollTrigger plugin)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Space Grotesk)

## Services
- **Jellyfin** - Media server for movies, TV shows, and music
- **Torrent** - Download manager for file transfers

---

## Inconsistencies Found & Prevention Rules

### 1. Duplicated Code
**Problem:** Brand/logo component was copy-pasted in Navbar.tsx and Footer.tsx.
**Rule:** If the same UI pattern appears in 2+ places, extract it into a shared component immediately. Never copy-paste JSX.

### 2. Hardcoded Colors
**Problem:** Colors like `#050508`, `#FF6B35`, `rgba(255,255,255,0.08)` were hardcoded in inline styles instead of using CSS variables.
**Rule:** ALWAYS use CSS variables from `:root` for colors. Never write hex/rgba values directly in component styles. Use `var(--accent-primary)` instead of `#FF6B35`.

### 3. Missing CSS Variables
**Problem:** Some colors (green `#10B981`, dark bg `#0A0A0F`) had no CSS variable.
**Rule:** If a color is used in the design, add it to `:root` in globals.css FIRST, then reference it via `var(--name)`.

### 4. Unused CSS Classes
**Problem:** 15+ CSS classes in globals.css were defined but never used (btn-primary, glass, card, animate-*, etc.).
**Rule:** Only add CSS classes when they are actually used by a component. Remove unused classes immediately. If a class exists in globals.css, it must be used somewhere.

### 5. Unnecessary Client Components
**Problem:** page.tsx had `'use client'` only because of GSAP blob animation, making the entire page a client component.
**Rule:** Extract client-side logic (GSAP, hooks, event handlers) into separate `'use client'` components. Keep page.tsx and layout.tsx as Server Components when possible.

### 6. GSAP Overkill
**Problem:** Navbar used GSAP for a simple glassmorphism toggle that could be done with CSS class + transitions.
**Rule:** Use CSS transitions/animations for simple state changes (hover, scroll class toggle). Use GSAP only for complex choreographed animations (stagger, scroll-trigger, timeline).

### 7. Inline Styles Everywhere
**Problem:** Components had massive inline style objects (20-50 lines per element).
**Rule:** Use CSS classes defined in globals.css for static styles. Use inline styles ONLY for dynamic values (props, computed colors). Move all static styling to CSS.

### 8. !important in Media Queries
**Problem:** Component `<style>` tags used `!important` to override inline styles on mobile.
**Rule:** Since styles are now in CSS classes (not inline), `!important` is unnecessary. Use proper CSS specificity instead.

### 9. Module-Level GSAP Registration
**Problem:** `gsap.registerPlugin(ScrollTrigger)` was called at module level outside of useEffect.
**Rule:** Register GSAP plugins inside `useEffect` or `if (typeof window !== 'undefined')` to avoid SSR issues.

### 10. React.FC Usage
**Problem:** Components used `React.FC` which is discouraged in React 19 (no longer provides children type).
**Rule:** Use `export default function ComponentName()` instead of `const Component: React.FC = () => {}`.

### 11. Outdated Documentation
**Problem:** skills.md referenced deleted files (ActiveDownloads.tsx, RecentDownloads.tsx).
**Rule:** Update skills.md whenever files are added/deleted. Keep the File Structure section in sync with actual codebase.

### 12. Hardcoded Component Data
**Problem:** Service data (title, description, color) was defined inline in the component.
**Rule:** Extract data arrays to constants at the top of the file or to a separate data file if they grow large.

### 13. Token Drift
**Problem:** Accent colors/gradients were duplicated inline in multiple components instead of using shared tokens.
**Rule:** Put canonical colors/gradients in CSS variables under `:root`. Components should consume shared tokens via `var(--name)`.

### 14. Lint Command Drift
**Problem:** `next lint` was used but Next.js CLI no longer exposes that command in this setup.
**Rule:** Keep lint script in package.json. Windows may have issues with `next lint` - use `npm run build` as primary verification.

### 15. ESLint Config Mismatch
**Problem:** Flat config was used with `extends`, which may be incompatible with ESLint v9 flat config.
**Rule:** `eslint.config.mjs` must use flat config imports. Base should come from `eslint-config-next/core-web-vitals`.

### 16. Broken Glassmorphism (Background Blur)
**Problem:** `backdrop-filter: blur()` failed to render correctly due to fully transparent parent backgrounds or browser stacking context bugs when applied directly to a fixed container or pseudo-element.
**Rule:** For reliable glassmorphism, NEVER apply `backdrop-filter` to the parent container or `::before`. ALWAYS use a dedicated, absolutely positioned `.glass-layer` child div with `aria-hidden="true"`, `z-index: -1`, a semi-transparent background (e.g., `rgba(15, 15, 15, 0.75)`), and a native `@supports` fallback for unsupported browsers. Ensure the area behind the glass isn't purely solid black (e.g., by adding an ambient background glow) so the blur actually has visual data to distort.

---

## Recommended Workflow

### Before Adding a New Component
1. Check if similar components exist (look for shared patterns)
2. Define CSS variables in globals.css FIRST if new colors are needed
3. Create CSS classes in globals.css for static styles
4. Use `'use client'` only if the component needs hooks/event handlers/browser APIs
5. Use `export default function ComponentName()` syntax

### Before Adding CSS
1. Check if a CSS variable exists for the color/value
2. Add to `:root` if it doesn't exist
3. Prefer CSS classes over inline styles
4. Use responsive classes in globals.css media queries

### Before Deleting Files
1. Remove all imports of the file
2. Update skills.md File Structure section
3. Remove any CSS classes that were only used by the deleted file

### Pre-Merge Validation
Before any merge/release, always run:
```bash
npm run build
```

### Documentation Hygiene
When framework/tooling behavior changes, update docs in the same PR:
- `skills.md` (this file)
- `package.json` scripts
- Any relevant config files

### Code Review Checklist
- [ ] No hardcoded colors (hex/rgba) in component styles
- [ ] No duplicated JSX patterns across components
- [ ] No unused CSS classes in globals.css
- [ ] `'use client'` only where needed
- [ ] GSAP only for complex animations
- [ ] skills.md File Structure matches actual files
- [ ] CSS variables used for all colors
- [ ] No `!important` in media queries
- [ ] Components use `export default function` syntax
- [ ] GSAP plugins registered inside useEffect
- [ ] `npm run build` passes
