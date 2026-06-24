export interface ExperienceItem {
  company: string
  role: string
  period: string
  description?: string
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    company: "AIDA Performance",
    role: "Full Stack Developer & UI Designer",
    period: "Ago 2023 – Presente",
    current: true,
    description:
      "Desarrollé y lancé sitios web para marcas como Cumbres Hotels, Patio Bellavista, Minería, Arquitectura. Construí una app interna de gestión UGC en Vite.js, migración a Next.js. Diseño de arquitectura monorepo en Next.js para otras marcas, componentes y design system entre sitios. Integraciones con plataformas externas, sistemas de reservas y analytics. E-commerce / Shopify.",
  },
  {
    company: "Figmenta",
    role: "Full Stack Developer & UI Designer",
    period: "May 2024 – Dic 2024 · Remoto, Milán",
    description:
      "Desarrollo e implementación de componentes UI para proyectos de clientes europeos. Trabajo remoto asíncrono con equipo internacional.",
  },
  {
    company: "Probel SpA",
    role: "Art Director & Web Developer",
    period: "Jun 2021 – Ago 2023",
    description:
      "Gestioné ecosistema digital y creativo de tres marcas simultáneamente. Desarrollé y mantuve sitios web y e-commerce en WordPress y Shopify. Branding: concepto, diseño, desarrollo y distribución. Motion graphics y video para activaciones de marca.",
  },
  {
    company: "Claro Chile SpA",
    role: "UI Designer / Frontend Stack",
    period: "Sep 2019 – Nov 2019",
  },
  {
    company: "Hyper™ Branding Agency",
    role: "Founder & Full Stack Developer",
    period: "Ene 2013 – Presente",
  },
]
