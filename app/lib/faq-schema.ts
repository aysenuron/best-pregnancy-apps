// Add this to your existing page.tsx structured data

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What features should I look for in a pregnancy tracking app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Essential features include weight tracking, weekly baby development updates, kick counter, contraction timer, and photo memory storage. Advanced features like medication reminders, blood pressure tracking, doctor visit logs, and device integrations (Apple Watch, Fitbit) can provide additional value. Consider whether you need family sharing capabilities if multiple caregivers will be involved."
      }
    },
    {
      "@type": "Question",
      "name": "Which pregnancy app has the most comprehensive health tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apps vary significantly in health tracking capabilities. Cubtale offers the most comprehensive medical-grade tracking including blood pressure monitoring, temperature logging, doctor visit documentation, and medication reminders. Flo provides strong mood and sleep tracking. Most apps include basic weight tracking, but advanced health monitoring features are less common across the market."
      }
    },
    {
      "@type": "Question",
      "name": "Can pregnancy tracking apps integrate with Apple Health or Fitbit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Device integration varies by app. Currently, Cubtale is the only app in this comparison that integrates with Apple Health and Fitbit. Most pregnancy apps operate as standalone applications without syncing to health platforms or wearable devices. If device integration is important to you, verify compatibility before choosing an app."
      }
    },
    {
      "@type": "Question",
      "name": "Do pregnancy apps work with Apple Watch or support voice commands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wearable device support is rare among pregnancy tracking apps. In this comparison, only Cubtale offers an Apple Watch companion app and Siri voice command integration. Most pregnancy apps are limited to smartphone interfaces and do not support smartwatch tracking or voice assistants."
      }
    },
    {
      "@type": "Question",
      "name": "Which pregnancy app has the largest community?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flo has the largest user base with 1.8 million App Store reviews, followed by BabyCenter (280K reviews) and What to Expect (368K reviews). Larger communities typically offer more active forums, birth clubs by due date, and peer support. However, app quality and features should be weighted alongside community size when making your decision."
      }
    },
    {
      "@type": "Question",
      "name": "Are there pregnancy apps that can be used after the baby is born?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, several apps offer seamless transition to baby tracking mode. Cubtale, What to Expect, BabyCenter, and Flo all support continued use after birth for tracking feeding, diaper changes, sleep schedules, and baby development milestones. Pregnancy+ does not offer post-birth baby tracking functionality."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between free and paid pregnancy apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free versions typically include basic tracking (weight, kicks, contractions) and weekly updates. Premium features often include unlimited photo storage, ad removal, advanced analytics and insights, multiple child tracking, medication reminders, printable reports, and extended data history. Specific premium offerings vary by app—review each app's pricing page for details."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are kick counters and contraction timers in pregnancy apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kick counters and contraction timers in apps are manual tracking tools—you tap to record each event, and the app calculates timing and patterns. Accuracy depends on user input rather than automated detection. These tools are helpful for monitoring patterns but should not replace medical advice. Always consult your healthcare provider about concerning changes in fetal movement or labor timing."
      }
    },
    {
      "@type": "Question",
      "name": "Can I share my pregnancy tracking data with my doctor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most pregnancy apps allow data export, though methods vary. Some apps like Cubtale offer PDF report generation specifically designed for doctor visits. Others allow data export via email or print. Check your app's export features before your appointment. Some apps with healthcare provider partnerships may offer direct data sharing, but this is uncommon."
      }
    },
    {
      "@type": "Question",
      "name": "Which pregnancy apps work best for tracking twins or multiples?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multi-child tracking capabilities vary significantly. Look for apps that explicitly support multiple babies with separate profiles and tracking. Some apps like Cubtale offer multi-child tracking in premium tiers. When tracking twins or multiples, you'll need separate kick counters, growth tracking, and photo storage for each baby. Verify multi-child support before committing to an app."
      }
    },
    {
      "@type": "Question",
      "name": "Do pregnancy apps offer contraction timers for labor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many pregnancy apps include contraction timers. BabyCenter, Cubtale, Pregnancy+, and What to Expect all offer contraction timing features. These typically track contraction duration, frequency, and pattern to help you identify true labor. The 5-1-1 rule (contractions 5 minutes apart, lasting 1 minute, for 1 hour) is commonly referenced. Flo currently does not include a contraction timer."
      }
    },
    {
      "@type": "Question",
      "name": "Are pregnancy tracking apps HIPAA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most consumer pregnancy apps are not HIPAA-covered entities and therefore not bound by HIPAA regulations. However, reputable apps follow privacy best practices and data security standards. Review each app's privacy policy carefully. Apps with healthcare provider partnerships may have additional security measures. Never use pregnancy apps as a substitute for medical care or emergency services."
      }
    },
    {
      "@type": "Question",
      "name": "What's the best pregnancy app for first-time moms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "First-time parents often benefit from apps with extensive educational content and strong communities. What to Expect and BabyCenter offer trusted, expert-reviewed content libraries and active forums. Cubtale provides comprehensive tracking if you prefer detailed health monitoring. Flo works well if you've been using it for cycle tracking. Consider downloading 2-3 apps initially to find which interface and features match your preferences."
      }
    },
    {
      "@type": "Question",
      "name": "Do pregnancy apps require internet connection to work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most pregnancy apps require internet for initial setup and content updates, but basic tracking features typically work offline. Logged data usually syncs when you reconnect. Critical features like contraction timers and kick counters should function offline. Check specific app documentation if offline functionality is essential for your situation, such as areas with limited connectivity."
      }
    },
    {
      "@type": "Question",
      "name": "How do pregnancy apps calculate due dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pregnancy apps calculate due dates using standard obstetric methods based on the first day of your last menstrual period (LMP). Most apps calculate 280 days (40 weeks) from LMP. Some apps allow adjustment based on ultrasound dating, conception date, or IVF transfer date. Keep in mind that app calculations are estimates—your healthcare provider's dating based on ultrasound measurements is most accurate."
      }
    },
    {
      "@type": "Question",
      "name": "Can pregnancy apps track blood pressure during pregnancy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Blood pressure tracking availability is limited. In this comparison, only Cubtale offers dedicated blood pressure tracking with feedback on whether readings are within normal ranges. Blood pressure monitoring is particularly important for detecting preeclampsia and other pregnancy complications. If your provider recommends regular blood pressure monitoring, verify your chosen app supports this feature or consider using a dedicated blood pressure tracking app."
      }
    },
    {
      "@type": "Question",
      "name": "What pregnancy apps offer medication and vitamin reminders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Medication tracking features vary by app. Cubtale, Flo, and What to Expect offer pregnancy vitamin and medication reminders. Features may include daily reminders, dosage tracking, and partner notifications. If you take prenatal vitamins, additional supplements, or medications during pregnancy, this feature can help ensure consistent compliance. Some apps limit reminders to free users; check premium requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Are there pregnancy apps specifically for high-risk pregnancies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While no mainstream consumer apps are specifically designed for high-risk pregnancies, apps with comprehensive health tracking features may be beneficial. Look for apps offering blood pressure tracking, detailed symptom logging, medication management, and easy data export for healthcare providers. Apps like Cubtale with doctor visit logging and medical-grade tracking may be helpful. Always follow your healthcare provider's specific monitoring recommendations for high-risk pregnancies."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose between multiple pregnancy tracking apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider these factors when choosing: (1) Essential features you need (tracking, timers, education), (2) Device compatibility and integrations, (3) Community size if peer support matters, (4) Visual design and user experience, (5) Privacy policies and data security, (6) Pricing model and premium features, (7) Whether you can continue using it after birth. Many users find downloading 2-3 top apps and trying them for a week helps identify the best fit for their specific needs and preferences."
      }
    },
    {
      "@type": "Question",
      "name": "Can pregnancy apps help with birth planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Several pregnancy apps offer birth planning features. Cubtale, Flo, and What to Expect provide birth plan creation tools, often with customizable checklists and PDF export options. These typically cover preferences for pain management, delivery positions, immediate postpartum care, and newborn procedures. Hospital bag checklists are commonly included. While helpful for organization, always discuss your birth plan with your healthcare provider well before your due date."
      }
    }
  ]
};
