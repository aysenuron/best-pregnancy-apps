"use client";
import React, { useState } from "react";
import { Check, X, Minus } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

interface FeatureData {
  feature: string;
  description?: string;
  apps: {
    [appName: string]: boolean | null;
  };
}

interface CategoryData {
  category: string;
  features: FeatureData[];
}

const FeatureComparisonChart: React.FC = () => {
  const { language } = useLanguage();
  const tChart = translations[language].featureChart;

  // Actual data from Cubtale spreadsheet
  const categories: CategoryData[] = [
    {
      category: "Health & Wellness Tracking",
      features: [
        {
          feature: "Memories",
          description:
            "Track baby growth with photos and videos, start the baby story",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Meds & Supps",
          description:
            "Track pregnancy vitamins, set daily reminders, partner can get reminders as well",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Weight",
          description: "Track and log weight throughout pregnancy",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Weight feedback",
          description: "Understand if you are on track with weight gain",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Blood Pressure",
          description: "Log and monitor blood pressure",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Blood Pressure Feedback",
          description: "Understand if you are doing well with blood pressure",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Temperature",
          description: "Log and understand body temperature",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Mood",
          description: "Track your mood throughout pregnancy",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
      ],
    },
    {
      category: "Medical & Planning",
      features: [
        {
          feature: "Tests",
          description: "Test schedule - when to take which test",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Visits",
          description: "Place where you can log visits",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Kick",
          description: "Baby kick counter - what is normal, what to expect",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Contractions",
          description: "Baby contractions - 5-1-1 rule, when to go to hospital",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Birth Plan PDF",
          description: "Checklist for your birth plan",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: null,
          },
        },
        {
          feature: "Hospital Bag PDF",
          description: "Checklist for hospital bag preparation",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: null,
          },
        },
      ],
    },
    {
      category: "Data & Analytics",
      features: [
        {
          feature: "Water",
          description: "Log daily water intake",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Apple Health/Fitbit Data",
          description: "Integrate with Apple Health or Fitbit",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Sleep",
          description: "Log and track sleep patterns",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Period",
          description: "Log periods after pregnancy",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Ovulation?",
          description: "Track ovulation",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Patterns/charts",
          description: "See your trends and patterns with logs",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
      ],
    },
    {
      category: "Integration & Features",
      features: [
        {
          feature: "1 app for all",
          description: "Switch to baby mode after baby is born in the same app",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Multiple caregivers",
          description: "Add family members to share access",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Siri",
          description: "Use voice to log with Siri",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Apple Watch",
          description: "Use your watch to track pregnancy",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": false,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Ads",
          description: "Contains advertisements",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
      ],
    },
    {
      category: "Tools & Resources",
      features: [
        {
          feature: "Baby Name Guide",
          description: "Find and explore baby names",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Due date calculator",
          description: "Calculate your due date",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Horoscope calculator",
          description: "Check baby's horoscope",
          apps: {
            Cubtale: true,
            Flo: false,
            "What to Expect": true,
            "Pregnancy+": false,
            Ovia: null,
            BabyCenter: false,
          },
        },
        {
          feature: "Baby week calculator",
          description: "Track your baby's development by week",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": false,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
        {
          feature: "Weekly baby updates",
          description: "Learn how your baby is growing each week",
          apps: {
            Cubtale: true,
            Flo: true,
            "What to Expect": true,
            "Pregnancy+": true,
            Ovia: null,
            BabyCenter: true,
          },
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].category
  );
  const selectedData = categories.find(
    (cat) => cat.category === selectedCategory
  )!;

  // Get all unique app names
  const appNames = [
    "Cubtale",
    "Flo",
    "What to Expect",
    "Pregnancy+",
    "Ovia",
    "BabyCenter",
  ];

  const renderIcon = (value: boolean | null) => {
    if (value === true) {
      return (
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
          <Check className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
        </div>
      );
    } else if (value === false) {
      return (
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-100">
          <X className="w-5 h-5 text-rose-500" strokeWidth={2.5} />
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
          <Minus className="w-5 h-5 text-gray-400" />
        </div>
      );
    }
  };

  const getFeatureScore = (apps: { [key: string]: boolean | null }) => {
    const values = Object.values(apps);
    const trueCount = values.filter((v) => v === true).length;
    const totalCount = values.filter((v) => v !== null).length;
    return totalCount > 0 ? Math.round((trueCount / totalCount) * 100) : 0;
  };

  const ComparisonChart = ({ data }: { data: CategoryData }) => {
    return (
      <div className="bg-white rounded-b-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-100 to-purple-100 px-6 py-5">
          <h3 className="text-xl font-semibold text-blue-950">
            {tChart.categoryLabels[data.category as keyof typeof tChart.categoryLabels] ?? data.category}
          </h3>
          <p className="text-blue-950 text-sm mt-1">
            {tChart.comparing} {data.features.length} {tChart.featuresAcross} {appNames.length} {tChart.apps}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Column Headers */}
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-80">
                  {tChart.featureCol}
                </th>
                {appNames.map((app) => (
                  <th key={app} className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-blue-950">
                        {app}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {data.features.map((feature, idx) => {
                const score = getFeatureScore(feature.apps);
                return (
                  <tr
                    key={idx}
                    className="hover:bg-indigo-50/50 transition-all duration-200"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-blue-950">
                            {tChart.featureNames[feature.feature as keyof typeof tChart.featureNames] ?? feature.feature}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {score}% {tChart.adoption}
                          </span>
                        </div>
                        {feature.description && (
                          <span className="text-xs text-gray-600 leading-relaxed">
                            {tChart.featureDescriptions[feature.feature as keyof typeof tChart.featureDescriptions] ?? feature.description}
                          </span>
                        )}
                      </div>
                    </td>
                    {appNames.map((app) => (
                      <td key={app} className="px-4 py-5 text-center">
                        <div className="flex justify-center">
                          {renderIcon(feature.apps[app])}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-gray-700 font-medium">{tChart.available}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-rose-500" />
                </div>
                <span className="text-gray-700 font-medium">{tChart.notAvailable}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Minus className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-gray-700 font-medium">{tChart.unknown}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-linear-to-b from-pink-50 via-blue-50 to-indigo-50 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl mb-4 text-blue-950">
            {tChart.title}
          </h2>
          <p className="text-lg text-gray-600">
            {tChart.subtitle}
          </p>
        </div>

        {/* Category Selector */}
        <div className="bg-white rounded-t-2xl py-4 lg:py-6 px-6 inline-flex justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:cursor-pointer ${
                selectedCategory === cat.category
                  ? "bg-linear-to-r from-indigo-100 to-purple-100 text-blue-950 shadow-md scale-105"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tChart.categoryLabels[cat.category as keyof typeof tChart.categoryLabels] ?? cat.category}
            </button>
          ))}
        </div>

        {/* Selected Chart */}
        <div className="mb-12">
          <ComparisonChart data={selectedData} />
        </div>
      </div>
    </div>
  );
};

export default FeatureComparisonChart;
