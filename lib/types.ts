export interface Feature {
  id: string
  title: string
  description: string
  type: string
  status: string
  platforms: string[]
  image: string
  documentation_link: string
  developer: {
    name: string
    email: string
  }
  [key: string]: any
}
