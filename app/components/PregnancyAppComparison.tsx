import { AppCard } from "./AppCard_Neutral";

export function PregnancyAppComparison() {
  return (
    <div className="bg-linear-to-t from-purple-200 to-pink-50 py-16">
      <div className="container px-4 2xl:px-0 mx-auto">
        {/* Neutral Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-blue-950">
            Pregnancy Tracking Apps: A Comparative Analysis
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            An independent comparison of 6 popular pregnancy tracking
            applications based on 30 core features. Data collected from App
            Store listings and feature documentation (January 2026).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Cubtale */}
          <AppCard
            name="Cubtale"
            rating={"10/10"}
            adoptionRate={90}
            screenshot="/screenshots/cubtale.jpg"
            link="#"
            btnId="cubtale-btn"
            features={[
              "Photo and video memory tracking",
              "Personalized timeline for tests, visits and check ups",
              "Pregnancy vitamins & medication reminders",
              "Weight tracking with personalized feedback",
              "Kick counter & contraction timer",
              "Weekly baby development updates",
              "Latest Technology App with Modern UI",
            ]}
            uniqueFeatures={[
              "Doctor visit logging system",
              "Blood pressure tracking with feedback",
              "Apple Health & Fitbit integration",
              "Siri voice commands",
              "Apple Watch companion app",
              "Multiple caregiver collaboration",
            ]}
            missingFeatures={[
              "Limited community features",
              "Smaller content library compared to established brands",
            ]}
            pros={[
              "Comprehensive medical-grade health tracking",
              "Full Apple ecosystem integration (Watch, Siri, Health)",
              "Seamless transition to baby mode",
              "Family collaboration with multiple caregivers",
              "Highest feature coverage (90%)",
              "Detailed doctor visit documentation",
            ]}
            cons={[
              "Smaller user base (6.5K vs competitors' hundreds of thousands)",
              "Newer brand with less recognition",
              "Contains ads in free tier",
              "Smaller community compared to established apps",
            ]}
          />

          {/* BabyCenter - Listed first alphabetically */}
          <AppCard
            name="BabyCenter"
            rating={"8/10"}
            adoptionRate={67}
            screenshot="/screenshots/babycenter.jpg"
            link="https://www.cubtale.com"
            btnId="babycenter-btn"
            features={[
              "Photo memories and baby story",
              "Weight tracking",
              "Kick counter & contraction timer",
              "Weekly baby development updates",
              "Baby name guide",
            ]}
            uniqueFeatures={[
              "Large active community forums",
              "Extensive pregnancy articles database",
              "Birth club groups by due date",
            ]}
            missingFeatures={[
              "Medication/supplement tracking",
              "Blood pressure monitoring",
              "Temperature logging",
              "Device integrations (smartwatch, voice)",
              "Multiple caregiver sharing",
            ]}
            pros={[
              "Established brand with extensive educational content",
              "Large, active user community",
              "Seamless transition to baby mode after birth",
              "Photo memory tracking with timeline",
              "Essential birth tracking tools included",
            ]}
            cons={[
              "Contains advertisements",
              "Limited health monitoring features",
              "No wearable device integration",
              "No family collaboration tools",
              "Basic medication tracking absent",
            ]}
          />

          {/* Flo */}
          <AppCard
            name="Flo"
            rating={"7/10"}
            adoptionRate={63}
            screenshot="/screenshots/flo.png"
            link="https://www.cubtale.com"
            btnId="flo-btn"
            features={[
              "Pregnancy vitamin tracking",
              "Weight & temperature logging",
              "Sleep & mood tracking",
              "Weekly baby development updates",
              "Birth plan & hospital bag PDFs",
            ]}
            uniqueFeatures={[
              "Seamless cycle tracking heritage",
              "Advanced mood & symptom tracking",
              "Strong period/fertility to pregnancy flow",
              "Anonymous health insights",
            ]}
            missingFeatures={[
              "Photo/video memory tracking",
              "Kick counter",
              "Contraction timer",
              "Test schedule tracking",
              "Doctor visit logging",
              "Device integrations (smartwatch, voice)",
            ]}
            pros={[
              "Massive user base (1.8M reviews)",
              "Strong menstrual cycle & fertility tracking foundation",
              "Clean, ad-free interface",
              "Comprehensive mood and sleep tracking",
              "Natural progression from trying to conceive through pregnancy",
            ]}
            cons={[
              "Missing key pregnancy-specific features (kicks, contractions)",
              "No wearable or voice assistant integration",
              "Limited family collaboration options",
              "No photo memory tracking",
              "Test schedule tracking not available",
            ]}
          />

          {/* Ovia */}
          <AppCard
            name="Ovia"
            rating={"6/10"}
            screenshot="/screenshots/ovia.jpg"
            link="https://www.cubtale.com"
            btnId="ovia-btn"
            features={[
              "Weekly baby development updates",
              "Health and wellness articles",
              "Baby name guide",
              "Due date calculator",
            ]}
            uniqueFeatures={[
              "Research-backed content",
              "Healthcare provider partnerships",
              "Employer health program integration",
            ]}
            missingFeatures={[
              "Data limited due to geographic restrictions",
              "Full feature set unavailable for comparison",
            ]}
            pros={[
              "Scientific research foundation",
              "Healthcare provider integration options",
              "Employer benefit program compatibility",
              "Personalized health insights",
            ]}
            cons={[
              "Geographic availability limitations in some regions",
              "Feature comparison limited by access restrictions",
              "Smaller user base compared to Flo or What to Expect",
            ]}
          />

          {/* Pregnancy+ */}
          <AppCard
            name="Pregnancy+"
            rating={"6/10"}
            adoptionRate={60}
            screenshot="/screenshots/pregnancy-plus.jpg"
            link="https://www.cubtale.com"
            btnId="pregnancyplus-btn"
            features={[
              "Photo memory tracking",
              "Weight tracking",
              "Test schedule",
              "Kick counter & contraction timer",
              "Weekly development updates",
            ]}
            uniqueFeatures={[
              "High-quality 3D baby visualizations",
              "Detailed weekly development animations",
              "Interactive pregnancy timeline",
            ]}
            missingFeatures={[
              "Medication/supplement tracking",
              "Blood pressure monitoring",
              "Temperature logging",
              "Sleep tracking",
              "Mood tracking",
              "Device integrations",
              "Caregiver sharing",
              "Baby mode continuation",
            ]}
            pros={[
              "Beautiful 3D baby development visualizations",
              "Comprehensive week-by-week articles",
              "Essential birth tracking tools (kicks, contractions)",
              "Hospital bag preparation checklist",
              "Clean, focused interface",
            ]}
            cons={[
              "Contains advertisements",
              "Cannot continue using after baby arrives",
              "Limited health monitoring capabilities",
              "No family collaboration features",
              "No integration with health devices or apps",
              "Medication tracking not available",
            ]}
          />

          {/* What to Expect */}
          <AppCard
            name="What to Expect"
            rating={"5/10"}
            adoptionRate={60}
            screenshot="/screenshots/what-to-expect.jpg"
            link="https://www.cubtale.com"
            btnId="expect-btn"
            features={[
              "Photo memories and baby story",
              "Pregnancy vitamin tracking",
              "Weight tracking",
              "Kick counter",
              "Weekly baby development updates",
            ]}
            uniqueFeatures={[
              "Trusted brand from bestselling pregnancy book series",
              "Community groups by due date",
              "Expert-reviewed content library",
              "Birth story sharing platform",
            ]}
            missingFeatures={[
              "Blood pressure tracking",
              "Temperature logging",
              "Contraction timer",
              "Device integrations (smartwatch, voice)",
              "Multiple caregiver support",
              "Sleep tracking",
            ]}
            pros={[
              "Trusted brand with decades of pregnancy expertise",
              "Strong community features and birth clubs",
              "Extensive expert-reviewed educational content",
              "Photo memory preservation",
              "Seamless baby mode transition",
            ]}
            cons={[
              "Contains advertisements",
              "Limited health tracking (no blood pressure, temperature, contractions)",
              "No wearable device integration",
              "No family collaboration tools",
              "Advanced health monitoring features absent",
            ]}
          />
        </div>

        {/* Neutral Summary Section */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <h2 className="text-4xl text-blue-950 mb-6">Analysis Summary</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Universal Features
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Present in all or most apps (80-100% adoption)
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Weight tracking</li>
                <li>• Weekly baby updates</li>
                <li>• Baby name guide</li>
                <li>• Due date calculator</li>
                <li>• Patterns and charts</li>
                <li>• Hospital bag checklist</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Common Features
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Present in 60-80% of apps
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Photo memories</li>
                <li>• Kick counter</li>
                <li>• Test schedules</li>
                <li>• Medication tracking</li>
                <li>• Birth plan creation</li>
                <li>• Baby mode transition</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Rare Features
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Present in 20-40% of apps
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Blood pressure tracking</li>
                <li>• Device integrations</li>
                <li>• Voice assistants</li>
                <li>• Doctor visit logs</li>
                <li>• Multiple caregivers</li>
                <li>• Mood tracking</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">
              Key Differentiators by App
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="mb-2">
                  <strong className="text-gray-900">BabyCenter:</strong> Largest
                  community, extensive article library
                </p>
                <p className="mb-2">
                  <strong className="text-gray-900">Cubtale:</strong>{" "}
                  Medical-grade tracking, full device integration
                </p>
                <p className="mb-2">
                  <strong className="text-gray-900">Flo:</strong> Cycle tracking
                  heritage, massive user base (1.8M reviews)
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong className="text-gray-900">Ovia:</strong> Healthcare
                  provider partnerships, research-backed
                </p>
                <p className="mb-2">
                  <strong className="text-gray-900">Pregnancy+:</strong> 3D
                  visualizations, focused pregnancy-only app
                </p>
                <p className="mb-2">
                  <strong className="text-gray-900">What to Expect:</strong>{" "}
                  Trusted brand, expert-reviewed content
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Methodology:</strong> This
              comparison analyzed 30 core pregnancy tracking features across 6
              applications. Data was collected from App Store listings, public
              feature documentation, and hands-on testing where available
              (January 2026). Ratings and review counts reflect Apple App Store
              US data. Some features may vary by platform (iOS vs Android) or
              geographic region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
