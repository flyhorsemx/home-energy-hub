import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "HomeEnergyHub Terms of Use — rules and policies for using our free quote service.",
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 2025</p>

      <div className="prose prose-gray max-w-none">
        <h2>1. Service Description</h2>
        <p>
          HomeEnergyHub is a free lead-generation and information service that helps homeowners request quotes from home improvement companies for solar, HVAC, roofing, and window installation services. We do not perform installation services ourselves.
        </p>

        <h2>2. No Warranty on Contractor Services</h2>
        <p>
          HomeEnergyHub does not guarantee the quality, licensing, or performance of any contractor matched through our service. We encourage users to independently verify contractor credentials, licenses, and insurance before signing any contract.
        </p>

        <h2>3. Accuracy of Information</h2>
        <p>
          Cost estimates, savings projections, and rebate information provided on this site are for general informational purposes only. Actual costs and savings vary by location, home size, and contractor pricing. Always obtain multiple quotes.
        </p>

        <h2>4. Affiliate Disclosures</h2>
        <p>
          Some links on this site are affiliate links. If you purchase a product through these links, we may receive a commission at no additional cost to you. Affiliate relationships do not influence our editorial recommendations.
        </p>

        <h2>5. User Conduct</h2>
        <p>
          You agree not to submit false contact information, spam our quote request system, or use our service for any purpose other than obtaining genuine home improvement quotes.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          HomeEnergyHub is not liable for damages arising from contractor performance, inaccurate savings estimates, or reliance on information published on this site.
        </p>

        <h2>7. Contact</h2>
        <p>Questions: <a href="mailto:hello@homeenergyhub.com">hello@homeenergyhub.com</a></p>
      </div>
    </div>
  )
}
