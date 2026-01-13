// components/AppCard.tsx
import { PregnancyApp } from '../lib/apps-data'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

export function AppCard({
  app,
  rank,
}: {
  app: PregnancyApp
  rank: number
}) {
  return (
    <Card className="mb-6 text-gray-700 overflow-hidden">
      <CardHeader>
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* LEFT: App Image */}
          <div>
            <div className="relative max-w-3xs rounded-xl overflow-hidden border bg-gray-50">
              <img
                src={app.image || "/images/apps/placeholder.png"}
                alt={`${app.name} app screenshot`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          {/* RIGHT: Text */}
          <div>
            <span className="text-3xl font-bold text-gray-300">
              #{rank}
            </span>

            <CardTitle className="text-2xl mt-2 font-medium text-blue-950">
              {app.name}
            </CardTitle>

            <p className="text-sm text-gray-600 mt-1">
              Best for: {app.bestFor}
            </p>

            <div className="mt-3">
              <div className="text-2xl font-bold">
                {app.rating}/5
              </div>
              <div className="text-sm text-gray-600">
                {app.price}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Features */}
        <div>
          <h3 className="font-semibold mb-2">
            Key Features
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {app.keyFeatures.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Pros / Cons */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              Pros
            </h4>
            <ul className="space-y-1">
              {app.pros.map((pro, i) => (
                <li key={i} className="text-sm">
                  ✓ {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-red-700 mb-2">
              Cons
            </h4>
            <ul className="space-y-1">
              {app.cons.map((con, i) => (
                <li key={i} className="text-sm">
                  ✗ {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
