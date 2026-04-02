export interface PregnancyApp {
    id: number
    name: string
    slug: string
    rating: number
    features: string[]
    pros: string[]
    cons: string[]
    screenshot: string
  }
  
  export const PregnancyApps: PregnancyApp[] = [
    {
      id: 1,
      name: "Cubtale Pregnancy",
      slug: "cubtale",
      rating: 4.9,
      features: [
        "Memories with photos and videos",
        "Medication and supplement reminders",
        "Test and visit tracking",
        "Weight and blood pressure feedback",
        "Kick counter and contraction timer",
        "Weekly baby updates",
        "Birth plan and hospital checklist PDFs",
      ],
      pros: [
        "Comprehensive health tracking in one app",
        "Clean and intuitive interface",
        "Strong pregnancy-specific features",
      ],
      cons: [
        "Limited features outside pregnancy",
        "Requires account to sync data",
      ],
      screenshot: "/hero.png",
    },
  
    {
      id: 2,
      name: "Flo",
      slug: "flo",
      rating: 4.8,
      features: [
        "Cycle and pregnancy tracking",
        "Medication reminders",
        "Journal and mood tracking",
      ],
      pros: [
        "Very popular and widely trusted",
        "Strong community features",
      ],
      cons: [
        "Many features behind paywall",
        "Less pregnancy-specific depth",
      ],
      screenshot: "/hero.png",
    },
  
    {
      id: 3,
      name: "What to Expect",
      slug: "what-to-expect",
      rating: 4.9,
      features: [
        "Pregnancy week-by-week updates",
        "Kick counter and contraction timer",
      ],
      pros: [
        "Well-known pregnancy brand",
        "Clear educational content",
      ],
      cons: [
        "Limited health tracking tools",
        "Interface feels dated",
      ],
      screenshot: "/hero.png",
    },
  
    {
      id: 4,
      name: "Pregnancy+",
      slug: "pregnancy-plus",
      rating: 4.8,
      features: [
        "3D baby development visuals",
        "Kick counter and contraction timer",
      ],
      pros: [
        "Beautiful visuals",
        "Easy to use",
      ],
      cons: [
        "Fewer tracking features",
        "Limited customization",
      ],
      screenshot: "/hero.png",
    },
  
    {
      id: 5,
      name: "Ovia",
      slug: "ovia",
      rating: 4.8,
      features: [
        "Pregnancy tracking",
        "Kick counter",
        "Weekly baby updates",
      ],
      pros: [
        "Simple and straightforward",
        "Free core features",
      ],
      cons: [
        "Basic design",
        "Limited advanced tools",
      ],
      screenshot: "/hero.png",
    },
  ]