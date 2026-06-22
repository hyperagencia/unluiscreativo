export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  image: string
}

export const projects: Project[] = [
  {
    slug: "proyecto-uno",
    title: "Proyecto Placeholder Uno",
    description:
      "Descripción breve del proyecto, plataforma desarrollada end-to-end.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    image: "placeholder/project-1",
  },
  {
    slug: "proyecto-dos",
    title: "Proyecto Placeholder Dos",
    description: "Descripción breve del segundo proyecto destacado.",
    tags: ["React", "Supabase", "Figma"],
    image: "placeholder/project-2",
  },
  {
    slug: "proyecto-tres",
    title: "Proyecto Placeholder Tres",
    description: "Descripción breve del tercer proyecto destacado.",
    tags: ["E-commerce", "UI/UX", "Branding"],
    image: "placeholder/project-3",
  },
]
