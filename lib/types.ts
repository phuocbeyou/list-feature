export interface Feature {
  id: string
  title: string
  description: string
  type: string
  status: string
  platforms: string[]
  image: string
  developer: {
    name: string
    email: string
  }
}
