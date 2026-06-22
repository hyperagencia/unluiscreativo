export interface TechStackCategory {
  category: string
  items: string[]
}

export const techStack: TechStackCategory[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PHP", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["Supabase", "MySQL"],
  },
  {
    category: "Tools",
    items: ["Figma", "Git", "Vercel", "Cloudinary"],
  },
  {
    category: "Motion",
    items: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
  },
  {
    category: "3D",
    items: ["Blender", "Octane Render"],
  },
  {
    category: "Design",
    items: ["Illustrator", "Photoshop", "Lightroom"],
  },
]
