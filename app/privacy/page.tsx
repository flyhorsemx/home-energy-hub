import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HomeEnergyHub Privacy Policy — how we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 2025</p>

      <div className="prose prose-gray max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          When you use HomeEnergyHub, we may collect: your ZIP code, name, email address, and phone number when you
          request quotes. We also collect standard web analytics data (pages visited, time on site) through Google
          Analytics.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your contact information to help you request quotes from local home improvement companies for home energy upgrades. We do not sell your data to data brokers. Your information is shared only with service providers who have agreed to use it solely to contact you about your quote request.
        </p>

        <h2>3. Lead Sharing</h2>
        <p>
          By submitting a quote request, you authorize CleverHomeEnergy and its partners to contact you about your request via phone, email, or SMS, including through automated technology where permitted. Consent is not a condition of purchase. You can opt out at any time by replying STOP to any SMS or contacting us at privacy@homeenergyhub.com.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use cookies and similar technologies for analytics and to improve site functionality. You can disable cookies in your browser settings, though some features may not function properly.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain your contact information for up to 24 months or until you request deletion, whichever comes first. To request deletion, email privacy@homeenergyhub.com.
        </p>

        <h2>6. Your Rights (CCPA / California Residents)</h2>
        <p>
          California residents have the right to know what personal information is collected, request deletion, and opt out of sale of personal information. We do not sell personal information. To exercise your rights, contact privacy@homeenergyhub.com.
        </p>

        <h2>7. Contact Us</h2>
        <p>For privacy-related questions: <a href="mailto:privacy@homeenergyhub.com">privacy@homeenergyhub.com</a></p>
      </div>
    </div>
  )
}
