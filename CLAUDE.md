@AGENTS.md

# unluiscreativo — resumen del proyecto

CV interactivo y portfolio profesional de Luis García (Full Stack Developer ·
UI/UX Designer · Creative Technologist). Ver AGENTS.md para el brief completo
(datos del CV, sistema de diseño, instrucciones de desarrollo).

## Estructura de carpetas

```
src/
  app/
    globals.css      # tokens del sistema de diseño (dark-only)
    layout.tsx        # Header + Footer + MobileCta + metadata
    page.tsx           # Home
  components/
    ui/                # primitivos shadcn Nova + presentacionales propios
      button.tsx       # variantes default/outline/secondary/ghost/destructive/link/accent
      badge.tsx        # variantes ... + accent (tag amarillo)
      card.tsx         # glassmorphism: rounded-[20px], border-card-border, bg-card
      section-title.tsx
      stat-card.tsx
      key-value-row.tsx
      separator.tsx, tooltip.tsx
    layout/
      header.tsx       # fixed, glassmorphism, nav + menú móvil (client)
      footer.tsx
      mobile-cta.tsx    # CTA fijo inferior solo móvil
    motion/
      fade-up.tsx       # MotionFadeUp: scroll reveal fadeUp reutilizable
  data/                 # contenido tipado (nunca hardcodeado en componentes)
    profile.ts
    experience.ts
    stats.ts
    projects.ts
    tech-stack.ts
  lib/
    utils.ts            # cn() = clsx + tailwind-merge
```

## Sistema de diseño (implementación)

Definido en `src/app/globals.css`. Sitio dark-only (sin toggle de tema):

- `--background: #0a0a0a`, `--foreground: #ffffff`
- `--accent: #fff414` — solo para CTAs, highlights y badges activos
- `--card: rgba(255,255,255,0.04)` / `--card-border: rgba(255,255,255,0.08)`
- `--muted: #a0a0a0` (texto body, expuesto como utilidad `text-muted-text`),
  `--muted-foreground: #6a6a6a` (labels/overlines)
- `--radius: 1.25rem` → `--radius-lg` ≈ 20px (radio canónico de las cards)

Tokens estructurales de shadcn (`--primary`, `--secondary`, `--border`,
`--ring`, `--sidebar-*`, `--chart-*`, etc.) están re-temados a oscuro para que
los primitivos de Radix/shadcn sigan funcionando sin necesidad de `.dark`.

## Convenciones de desarrollo

- App Router exclusivamente, sin Pages Router ni `middleware.ts`.
- Server Components por defecto; `"use client"` solo donde hay estado o
  interactividad (p. ej. menú móvil del header, `MotionFadeUp`).
- Datos de contenido en `src/data/*.ts`, tipados, nunca hardcodeados en JSX.
- Variantes de componentes con `class-variance-authority` + `cn()` de
  `@/lib/utils`, siguiendo el patrón `data-slot` del preset Nova.
- Animaciones: `MotionFadeUp` (`y: 20 → 0`, `opacity: 0 → 1`, `duration: 0.5`,
  `viewport={{ once: true }}`). Para listas, pasar `delay={i * 0.06-0.08}` por
  ítem para stagger.

## Pendiente (fuera de alcance de la base actual)

- Páginas `/about`, `/work`, `/work/[slug]`, `/contact`
- Integración de Cloudinary (`CldImage`) y optimización de imágenes
