@AGENTS.md

# unluiscreativo — resumen del proyecto

CV interactivo y portfolio profesional de Luis García (Product Engineer · Full Stack Developer).
One-page layout. Dark-only (`#0a0a0a`), acento amarillo (`#fff414`), cards `#2f2f2f`, glassmorphism, iconos SVG pixelados, Framer Motion.
Bilingüe ES/EN con next-intl v4 — `/` español, `/en` inglés.

## Dominio y ramas git

- **Dominio:** `luis.hyperagencia.com` (Vercel)
- **`main`** → producción en Vercel. Merge desde `dev` cuando esté listo.
- **`dev`** → desarrollo activo. Todo el trabajo va aquí.

Merge a producción: `git checkout main && git merge dev && git push origin main`

## Estructura de carpetas

```
messages/
  es.json               # todos los strings en español (fuente de verdad)
  en.json               # todos los strings en inglés
src/
  app/
    globals.css           # tokens del sistema de diseño (dark-only)
    layout.tsx            # root mínimo: <html lang={locale}> + <body> vía getLocale()
    [locale]/
      layout.tsx          # NextIntlClientProvider + Header + Footer + Preloader + SmoothScroll
                          # generateStaticParams, generateMetadata dinámica por locale
      page.tsx            # Home: Hero → About → CardsGrid → ProjectsSection → StatsSection → AlgoMasSection → CtaSection + MusicPlayer
    icon.svg              # favicon
  i18n/
    routing.ts            # defineRouting: locales ['es','en'], defaultLocale 'es', localePrefix 'as-needed'
    request.ts            # getRequestConfig — carga messages/{locale}.json
    navigation.ts         # createNavigation(routing) — Link, useRouter, usePathname locale-aware
  proxy.ts               # next-intl middleware (Next.js 16: proxy.ts, no middleware.ts)
  components/
    ui/                   # primitivos shadcn + propios
    layout/
      header.tsx          # fixed h-8 top-4, glassmorphism, nav desktop + menú mobile fullscreen amarillo
                          # LanguageSwitcher (ES/EN): desktop → pill junto a Contacto; mobile → 2 botones en menú
                          # Despacha CustomEvent "mobilemenu" {open} para que MusicPlayer se oculte
                          # useRouter/usePathname de @/i18n/navigation para cambiar locale
      footer.tsx          # LinkedIn + Instagram centrados + copyright — "use client" con useTranslations
    motion/
      fade-up.tsx         # MotionFadeUp: scroll reveal fadeUp reutilizable
      preloader.tsx       # Preloader(phrase?), Reveal, FadeIn, usePreloaderDone — blur word-by-word
                          # phrase viene del layout server vía getTranslations("preloader")
      smooth-scroll.tsx   # Lenis (duration 1.4) + stopLenis() / startLenis() / scrollToAnchor() exportados
      music-player.tsx    # MusicPlayer: waveform amarilla, scrollY===0 → centrado, scroll → bottom-right
                          # Se oculta cuando menú mobile abre (escucha "mobilemenu" CustomEvent)
                          # Textos via useTranslations("music")
    sections/
      hero.tsx            # id="hero", grid 2-col, foto derecha, blur animation post-preloader, useTranslations("hero")
      about.tsx           # id="sobre-mi", scroll morph radius+margin, HoverWord con card flotante via portal
                          # Párrafos via t.rich() para HoverWords intercaladas en la frase
      cards-grid.tsx      # id="cards", 3 cards (Sobre mí / Stack / Experiencia) → Drawer lateral desde derecha
                          # Drawer desktop: panelRef + mobilePanelRef, wheel capture para ambos paneles
                          # Mobile drawer: close btn fijo arriba, contenido en div interno scrollable
                          # ExperienceContent usa getExperience(useLocale()) — locale-aware
      projects-section.tsx # id="proyectos", carrusel horizontal desktop / apiladas mobile
                          # ProjectCard soporta video?: string (loop autoplay muted) o image
                          # Datos via getProjects(useLocale())
      stats-section.tsx   # bg-[#0a0a0a], grid 2×2 mobile / 4-col desktop, cards hover amarillo
                          # Valores de stats.ts (solo value), labels via useTranslations("stats")
      algo-mas-section.tsx # id="algo-mas", bg-[#2f2f2f] scroll-morph igual que About
                          # HoverWord soporta href (link externo), type: image|video|stack
                          # Párrafo via t.rich() para HoverWords; StackedPhotos: 3 fotos rotadas
      cta-section.tsx     # Sección estática bg-[#0a0a0a] debajo de AlgoMas — reveal natural al scrollear
                          # ContactButton: mailto con partículas ☕ escalonadas en hover
                          # Textos via useTranslations("cta")
  data/
    profile.ts            # name, headline, location, summary (referencia, no usado en componentes directamente)
    experience.ts         # getExperience(locale): ExperienceItem[] — variantes ES + EN
                          # export experience = experienceES (backward compat)
    projects.ts           # getProjects(locale): Project[] — variantes ES + EN
                          # export projects = projectsES (backward compat)
    stats.ts              # Stat[]: solo { value } — labels en messages.json
    tech-stack.ts
  lib/
    utils.ts              # cn() = clsx + tailwind-merge
public/
  assets/
    logo-luis-garcia-large.svg
    lg-fav-icon.svg
    luis-foto.webp        # foto hero + OG image placeholder
    luis-pp.jpg           # foto perfil en drawer Sobre mí y hovercard "corro"
    luis-pp3.jpg          # hovercard "hago música"
    hyper.jpg             # hovercard Hyper™
    film-luis.webm        # hovercard "filmo cosas"
    fotos/                # p1.jpg, p2.jpg, p3.jpg — StackedPhotos en hovercard fotografío
    projects/             # art-stgo-cover.jpg, general-focus.jpg, carlos-conca.jpg, audi-web.webm
    sounds/               # Sting-Every-Breath-You-Take.mp3
```

## i18n — convenciones

- **Librería:** next-intl v4. Path-based, `localePrefix: 'as-needed'` (ES en `/`, EN en `/en`).
- **Strings simples:** `useTranslations("namespace")` en client components; `getTranslations({ locale, namespace })` en server components.
- **Párrafos con HoverWords:** `t.rich("key", { tag: (chunks) => <HoverWord ...>{chunks}</HoverWord> })` — permite reposicionar las palabras clicables por idioma.
- **Data locale-aware:** `getExperience(locale)` / `getProjects(locale)` — usar `useLocale()` en client components para obtener el locale actual.
- **Preloader:** la frase se obtiene en `[locale]/layout.tsx` con `getTranslations("preloader")` y se pasa como prop a `<Preloader phrase={...}>`.
- **Añadir string nuevo:** editar `messages/es.json` y `messages/en.json` en el namespace correspondiente.

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
- Strings de UI **nunca hardcodeados** en JSX — siempre en `messages/es.json` + `messages/en.json`.
- Datos estructurales (URLs, slugs, rutas de imagen) en `src/data/*.ts`.
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
- LanguageSwitcher usa `useRouter` + `usePathname` de `@/i18n/navigation` (no de next/navigation)

### Cards hover (stack / proyectos / stats)
- Normal: `bg-[#2f2f2f]`, texto blanco, flecha/icono amarillo
- Hover: `bg-[#fff414]`, texto `#0a0a0a`, botón flecha `bg-[#0a0a0a]` con icono amarillo

### Drawer
- Desktop: `fixed top-[4%] right-[4%] bottom-[4%] w-[40%]`, `rounded-[25px]`, close btn izquierda
- Mobile: `fixed inset-0` sin radius, close btn `shrink-0` fuera del scroll, contenido en div interno `overflow-y-auto`
- Close btn: `rounded-[15px] bg-[#fff414]` hover `bg-[#0a0a0a] text-[#fff414]`

### MusicPlayer
- `scrollY === 0` → centrado con pill de texto ("Escucha algo de música" / "Listen to some music")
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
5. `<StatsSection />` — negro `#0a0a0a`, 4 cards hover amarillo, números amarillos grandes
6. `<AlgoMasSection />` — `id="algo-mas"`, gris `#2f2f2f` scroll-morph, HoverWords
7. `<CtaSection />` — negro `#0a0a0a` estático debajo de AlgoMas, texto CTA + ContactButton ☕
8. `<MusicPlayer />` — flotante, comportamiento por scrollY

## Pendiente

- OG image real (1200×630) en `public/og-image.png` — actualmente usa `luis-foto.webp` como placeholder
- Imágenes reales para hovercards "corro" y "hago música" en AlgoMasSection
- Copy del Hero — mejorar la línea de presentación para que diferencie más
- Optimización de imágenes con Cloudinary (`CldImage`)
