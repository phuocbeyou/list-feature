export interface FeatureItem {
  title: string
  description: string
}

export interface InstallationStep {
  step_number: number
  title: string
  description: string
}

export interface InstallationGuide {
  steps: InstallationStep[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface Developer {
  name: string
  email: string
  profile_image?: string
}

export interface Feature {
  id: string
  title: string
  description: string
  type: string
  status: string
  version: string
  release_date: string
  platforms: string[]
  image: string
  documentation_link?: string
  developer: Developer
  features: FeatureItem[]
  screenshots: string[]
  installation_guide: InstallationGuide
  faq: FAQ[]
}
