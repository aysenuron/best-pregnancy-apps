import { PregnancyApps } from "../lib/apps-data";
import { AppCard } from "./AppCard";

export default function AppComparison() {
  return (
    <section className="py-10 bg-linear-to-t to-purple-200 from-pink-50">
      <div className="container mx-auto">
        <h2 className="mb-8 text-4xl text-blue-950">
          Best Pregnancy Tracker Apps in 2026
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PregnancyApps.map((app) => (
            <AppCard key={app.slug} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
