export interface Project {
  slug: string
  title: string
  description: string
  stack: string
  url: string
  image: string
  video?: string
}

export const projects: Project[] = [
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
