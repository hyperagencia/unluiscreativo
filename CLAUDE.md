@AGENTS.md

# unluiscreativo — resumen del proyecto

CV interactivo y portfolio profesional de Luis García (Product Engineer · Full Stack Developer).
One-page layout. Dark-only (`#0a0a0a`), acento amarillo (`#fff414`), cards `#2f2f2f`, glassmorphism, iconos SVG pixelados, Framer Motion.

## Ramas git

- **`main`** → Coming Soon desplegado en Vercel. No tocar salvo para mergear `dev` cuando el sitio esté listo.
- **`dev`** → sitio completo en construcción. Todo el desarrollo va aquí.

Merge final: `git checkout main && git merge dev && git push origin main`

## Estructura de carpetas

```
src/
  app/
    globals.css           # tokens del sistema de diseño (dark-only)
    layout.tsx            # SmoothScroll + Preloader + Header + Footer; metadata OG/Twitter incluida
    page.tsx              # Home: Hero → About → CardsGrid → ProjectsSection → StatsSection → AlgoMasSection + MusicPlayer
    icon.svg              # favicon (lg-fav-icon.svg copiado aquí)
  components/
    ui/                   # primitivos shadcn + propios
    layout/
      header.tsx          # fixed h-8 top-4, glassmorphism, nav desktop + menú mobile fullscreen amarillo
                          # Mobile: barra amarilla + botón negro con icono grid; menú fullscreen con items stagger
                          # Despacha CustomEvent "mobilemenu" {open} para que MusicPlayer se oculte
      footer.tsx          # CTA "¿Hablamos?" + botón Contáctame + LinkedIn/Instagram centrados
    motion/
      fade-up.tsx         # MotionFadeUp: scroll reveal fadeUp reutilizable
      preloader.tsx       # Preloader(phrase?), Reveal, FadeIn, usePreloaderDone — blur word-by-word
      smooth-scroll.tsx   # Lenis (duration 1.4) + stopLenis() / startLenis() / scrollToAnchor() exportados
      music-player.tsx    # MusicPlayer: waveform amarilla, scrollY===0 → centrado, scroll → bottom-right
                          # Se oculta cuando menu mobile abre (escucha "mobilemenu" CustomEvent)
    sections/
      hero.tsx            # id="hero", grid 2-col, foto derecha, blur animation post-preloader
      about.tsx           # id="sobre-mi", scroll morph radius+margin, HoverWord con card flotante via portal
                          # HoverCardData: caption, bg?, image?
      cards-grid.tsx      # id="cards", 3 cards (Sobre mí / Stack / Experiencia) → Drawer lateral desde derecha
                          # Drawer desktop: panelRef + mobilePanelRef, wheel capture para ambos paneles
                          # Mobile drawer: close btn fijo arriba, contenido en div interno scrollable
      projects-section.tsx # id="proyectos", carrusel horizontal desktop / apiladas mobile
                          # ProjectCard soporta video?: string (loop autoplay muted) o image
      stats-section.tsx   # bg-[#0a0a0a], grid 2×2 mobile / 4-col desktop, números en #fff414
                          # Datos desde src/data/stats.ts, animación MotionFadeUp stagger
      algo-mas-section.tsx # id="algo-mas", bg-[#2f2f2f] scroll-morph igual que About
                          # HoverWord soporta href (link externo), type: image|video|stack
                          # StackedPhotos: 3 fotos rotadas como mazo de cartas
                          # ContactButton: mailto con partículas ☕ escalonadas en hover
      experience-section.tsx # Componente legacy — YA NO SE USA (experiencia está en Drawer de CardsGrid)
  data/
    profile.ts            # name, headline, location, summary
    experience.ts         # ExperienceItem[]: company, role, period, description?, current?
    projects.ts           # Project[]: slug, title, description, stack, url, image, video?
    stats.ts              # Stat[]: value, label — 4 items (8+, 50+, 10+, 13)
    tech-stack.ts
  lib/
    utils.ts              # cn() = clsx + tailwind-merge
public/
  assets/
    logo-luis-garcia-large.svg
    lg-fav-icon.svg
    luis-foto.webp        # también usada como OG image placeholder
    luis-pp.jpg           # foto perfil en drawer Sobre mí
    hyper.jpg
    projects/             # art-stgo-cover.jpg, general-focus.jpg, carlos-conca.jpg, audi-web.webm
    sounds/               # Sting-Every-Breath-You-Take.mp3
```

## Sistema de diseño

Definido en `src/app/globals.css`. Dark-only (sin toggle de tema):

- `--background: #0a0a0a`, `--foreground: #ffffff`
- `--accent: #fff414` — CTAs, highlights, badges activos, barras del music player
- Cards: `bg-[#2f2f2f]` (cards principales), `bg-[#191919]` (cards internas del drawer)
- `--card-border: rgba(255,255,255,0.08)`
- Radio canónico: `rounded-[20px]` para cards externas, `rounded-[14px]` interior, `rounded-[15px]` botones acción
- Contraste mínimo AA: textos secundarios en `text-white/70` sobre `#2f2f2f` (no usar `text-white/50`)

## Convenciones de desarrollo

- App Router exclusivamente. Server Components por defecto; `"use client"` solo donde hay estado/interactividad.
- Datos de contenido en `src/data/*.ts`, tipados, nunca hardcodeados en JSX.
- Animaciones de entrada: `MotionFadeUp` con `delay={i * 0.06-0.08}` para stagger.
- Blur animation post-preloader: `initial={{ opacity:0, filter:"blur(14px)" }}` → `animate={ready ? {opacity:1, filter:"blur(0px)"} : {}}` usando `usePreloaderDone()`.
- Drawers: `createPortal` al `document.body`, `AnimatePresence` `x:"110%"→0`, Lenis `stop()`/`start()` al abrir/cerrar, capturing wheel listener para scroll interno (desktop + mobile).
- `data-header-theme="dark"|"light"` en cada `<section>` para que el header cambie contraste.
- Nav anchors: usar `scrollToAnchor(href)` de `smooth-scroll.tsx` (no `href` directo) para scroll suave via Lenis.

## Componentes clave — patrones

### Header (surface dark/light)
- Surface dark: `bg-[#383A39]/70 text-white hover:bg-[#EFEFEF] hover:text-[#0a0a0a]`
- Surface light: `bg-black/10 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white`
- CTA "Contacto": `mailto:luis@hyperagencia.com`
- Mobile: barra amarilla full-width `rounded-[16px]`, botón negro con GridIcon 3×3
- Menú mobile: `fixed inset-0 bg-[#0a0a0a]`, items `bg-[#191919] rounded-[14px]`, CTA amarillo fijo abajo

### Cards hover (stack / proyectos)
- Normal: `bg-[#2f2f2f]`, texto blanco, flecha/icono amarillo
- Hover: `bg-[#fff414]`, texto `#0a0a0a`, botón flecha `bg-[#0a0a0a]` con icono amarillo

### Drawer
- Desktop: `fixed top-[4%] right-[4%] bottom-[4%] w-[40%]`, `rounded-[25px]`, close btn izquierda
- Mobile: `fixed inset-0` sin radius, close btn `shrink-0` fuera del scroll, contenido en div interno `overflow-y-auto`
- Close btn: `rounded-[15px] bg-[#fff414]` hover `bg-[#0a0a0a] text-[#fff414]`

### MusicPlayer
- `scrollY === 0` → `fixed bottom-6 left-1/2 -translate-x-1/2` (centrado) con pill de texto
- `scrollY > 0` → `fixed bottom-6 right-6` solo waveform
- Se oculta (opacity 0, duration 0.3s) cuando el menú mobile está abierto
- Audio: `use-sound` + Howler `sound.fade(0, 0.7, 1500)` para fade-in

### Scroll morph (About / AlgoMas)
- `useScroll` + `useTransform` sobre `borderRadius` y `marginInline`
- Keyframes: `[0, 0.15, 0.85, 1]` → `[0, 24, 24, 0]`

## Secciones de la home (orden)

1. `<Hero />` — `id="hero"`, `min-h-screen`, foto Luis derecha, título blur post-preloader
2. `<About />` — `id="sobre-mi"`, sección amarilla scroll-morph, HoverWords con imagen en card
3. `<CardsGrid />` — `id="cards"`, 3 cards: "Sobre mí", "Stack", "Experiencia laboral" (cada una abre Drawer)
4. `<ProjectsSection />` — `id="proyectos"`, carrusel cards con imagen/video 1:1
5. `<StatsSection />` — negro `#0a0a0a`, 4 stats en grid, números amarillos grandes
6. `<AlgoMasSection />` — `id="algo-mas"`, gris `#2f2f2f` scroll-morph, HoverWords + CTA contacto con ☕
7. `<MusicPlayer />` — flotante, comportamiento por scrollY

## Pendiente

- OG image real (1200×630) en `public/og-image.png` — actualmente usa `luis-foto.webp` como placeholder
- Rellenar proyectos reales en `src/data/projects.ts` con url + imagen/video en `public/assets/projects/`
- Copy del Hero — mejorar la línea de presentación para que diferencie más
- Optimización de imágenes con Cloudinary (`CldImage`)
