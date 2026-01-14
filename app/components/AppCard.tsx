import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type AppCardProps = {
  name: string
  rating: number
  features?: string[]
  pros?: string[]
  cons?: string[]
  screenshot: string
}

export function AppCard({
  name,
  rating,
  screenshot,
  features = [],
  pros = [],
  cons = [],
}: AppCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm text-muted-foreground">
            ⭐ {rating}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Screenshot */}
        <div className="relative mx-auto h-96 w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={screenshot}
            alt={`${name} app screenshot`}
            fill
            className="object-cover"
          />
        </div>

        {/* Features */}
        {features.length > 0 ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold">Key features</h3>
            <ul className="space-y-2 text-sm">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Pros */}
        <div>
          <h3 className="mb-2 text-sm font-semibold">Pros</h3>
          <ul className="space-y-2 text-sm">
            {pros.map((pro) => (
              <li key={pro} className="flex gap-2">
                <span className="text-emerald-600">+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div>
          <h3 className="mb-2 text-sm font-semibold">Cons</h3>
          <ul className="space-y-2 text-sm">
            {cons.map((con) => (
              <li key={con} className="flex gap-2">
                <span className="text-red-500">–</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
