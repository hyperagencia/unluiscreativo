export interface Project {
  slug: string
  title: string
  description: string
  stack: string
  url: string
  image: string
  video?: string
}

const projectsES: Project[] = [
  {
    slug: "proyecto-uno",
    title: "Art Stgo Web / App Design",
    description: "Diseño web y app para Artistas de ART STGO",
    stack: "Angular, Flutter",
    url: "https://www.artstgo.cl/home",
    image: "/assets/projects/art-stgo-cover.jpg",
  },
  {
    slug: "proyecto-dos",
    title: "General Focus",
    description: "Diseño y desarrollo del e-commerce de General Focus",
    stack: "Shopify, Liquid",
    url: "https://generalfocus.cl/",
    image: "/assets/projects/general-focus.jpg",
  },
  {
    slug: "proyecto-tres",
    title: "Carlos Conca",
    description: "Website para Profesor e Ingeniero Matemático",
    stack: "Frontend, WordPress + Javascript",
    url: "https://carlosconca.cl/",
    image: "/assets/projects/carlos-conca.jpg",
  },
  {
    slug: "proyecto-cuatro",
    title: "Audi Web Landing",
    description: "Diseño de landing para Audi Sudafrica",
    stack: "Webflow, Motion",
    url: "https://hyperagencia.com/portfolio/audi/",
    image: "",
    video: "/assets/projects/audi-web.webm",
  },
]

const projectsEN: Project[] = [
  {
    slug: "proyecto-uno",
    title: "Art Stgo Web / App Design",
    description: "Web and app design for ART STGO Artists",
    stack: "Angular, Flutter",
    url: "https://www.artstgo.cl/home",
    image: "/assets/projects/art-stgo-cover.jpg",
  },
  {
    slug: "proyecto-dos",
    title: "General Focus",
    description: "Design and development of the General Focus e-commerce",
    stack: "Shopify, Liquid",
    url: "https://generalfocus.cl/",
    image: "/assets/projects/general-focus.jpg",
  },
  {
    slug: "proyecto-tres",
    title: "Carlos Conca",
    description: "Website for a Mathematical Engineer and Professor",
    stack: "Frontend, WordPress + Javascript",
    url: "https://carlosconca.cl/",
    image: "/assets/projects/carlos-conca.jpg",
  },
  {
    slug: "proyecto-cuatro",
    title: "Audi Web Landing",
    description: "Landing page design for Audi South Africa",
    stack: "Webflow, Motion",
    url: "https://hyperagencia.com/portfolio/audi/",
    image: "",
    video: "/assets/projects/audi-web.webm",
  },
]

export function getProjects(locale: string): Project[] {
  return locale === "en" ? projectsEN : projectsES
}

export const projects = projectsES
