export default function Methodology() {
  return (
    <section
      className="py-10 bg-linear-to-t to-purple-200 from-pink-50"
      id="methodology"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-8 text-blue-950">
          How We Evaluated These Apps
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 p-6 bg-white">
            <div className="mb-3 text-blue-700 text-xl">🩺</div>
            <h3 className="font-semibold text-lg text-blue-950 mb-2">
              Medical Accuracy
            </h3>
            <p className="text-gray-700 text-sm">
              Verified against official ACOG clinical guidelines to ensure
              medically sound information.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 bg-white">
            <div className="mb-3 text-blue-700 text-xl">🔐</div>
            <h3 className="font-semibold text-lg text-blue-950 mb-2">
              Privacy & Security
            </h3>
            <p className="text-gray-700 text-sm">
              Privacy policies reviewed for GDPR and HIPAA compliance.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 bg-white">
            <div className="mb-3 text-blue-700 text-xl">🧩</div>
            <h3 className="font-semibold text-lg text-blue-950 mb-2">
              Feature Completeness
            </h3>
            <p className="text-gray-700 text-sm">
              Evaluated core tools such as contraction timers, kick counters,
              and pregnancy tracking.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 bg-white">
            <div className="mb-3 text-blue-700 text-xl">⭐</div>
            <h3 className="font-semibold text-lg text-blue-950 mb-2">
              User Feedback
            </h3>
            <p className="text-gray-700 text-sm">
              Analysis of 500+ App Store and Google Play reviews.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6 bg-white">
            <div className="mb-3 text-blue-700 text-xl">⏱️</div>
            <h3 className="font-semibold text-lg text-blue-950 mb-2">
              Real-World Testing
            </h3>
            <p className="text-gray-700 text-sm">
              Each app tested for 30 days to evaluate usability and consistency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
