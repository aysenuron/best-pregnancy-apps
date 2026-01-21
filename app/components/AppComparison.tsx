import { PregnancyApps } from "../lib/apps-data";
import { AppCard } from "./AppCard";

export default function AppComparison() {
  return (
    <section className="bg-linear-to-t from-purple-200 to-pink-50 py-16">
      <div className="container px-4 2xl:px-0 mx-auto">
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
