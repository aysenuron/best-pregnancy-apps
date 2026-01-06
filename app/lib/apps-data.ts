export interface PregnancyApp {
    id: number
    name: string
    rating: number
    price: string
    bestFor: string
    keyFeatures: string[]
    pros: string[]
    cons: string[]
    privacyScore: number
    link: string
  }
  
  export const apps: PregnancyApp[] = [
    {
      id: 1,
      name: 'App Name',
      rating: 4.5,
      price: 'Free with premium',
      bestFor: 'First-time parents',
      keyFeatures: ['Week-by-week guide', 'Contraction timer', 'Kick counter'],
      pros: ['Easy to use', 'Great illustrations'],
      cons: ['Ads in free version'],
      privacyScore: 8,
      link: 'https://...'
    },
    {
        id: 2,
        name: 'App Name',
        rating: 4.5,
        price: 'Free with premium',
        bestFor: 'First-time parents',
        keyFeatures: ['Week-by-week guide', 'Contraction timer', 'Kick counter'],
        pros: ['Easy to use', 'Great illustrations'],
        cons: ['Ads in free version'],
        privacyScore: 8,
        link: 'https://...'
      },
    // Add 4 more...
  ]