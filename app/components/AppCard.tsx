// components/AppCard.tsx
import { PregnancyApp } from '../lib/apps-data'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function AppCard({key, app, rank }: { app: PregnancyApp, rank: number, key: number }) {
  return (
    <Card className="mb-6" key={key}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-3xl font-bold text-gray-300">#{rank}</span>
            <CardTitle className="text-2xl mt-2">{app.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Best for: {app.bestFor}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{app.rating}/5</div>
            <div className="text-sm text-gray-600">{app.price}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1">
            {app.keyFeatures.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
            <ul className="space-y-1">
              {app.pros.map((pro, i) => (
                <li key={i} className="text-sm">✓ {pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
            <ul className="space-y-1">
              {app.cons.map((con, i) => (
                <li key={i} className="text-sm">✗ {con}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}