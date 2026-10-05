import { LegalLayout } from "@/components/LegalLayout"

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      eyebrow="Terms of Service"
      title="Terms of Service"
      lastUpdated="August 2, 2026"
      sections={[
        {
          id: "acceptance",
          heading: "Acceptance of Terms",
          content: (
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to
              and use of Subwatch. By creating an account or using the service,
              you agree to be bound by these Terms. If you do not agree, you may
              not use Subwatch.
            </p>
          ),
        },
        {
          id: "description",
          heading: "Description of Service",
          content: (
            <p>
              Subwatch is a tool that helps you track recurring subscriptions,
              monitor renewal dates, and manage related spending. We may add,
              change, or remove features at any time, and we may suspend or
              discontinue the service, in whole or in part, with or without
              notice.
            </p>
          ),
        },
        {
          id: "accounts",
          heading: "Account Registration",
          content: (
            <p>
              To use Subwatch, you must create an account by providing accurate
              and complete information, or by authenticating through a supported
              third-party provider such as Google. You are responsible for
              maintaining the confidentiality of your login credentials and for
              all activity that occurs under your account. Notify us immediately
              of any unauthorized use.
            </p>
          ),
        },
        {
          id: "eligibility",
          heading: "Eligibility",
          content: (
            <p>
              You must be at least 13 years old (or the minimum age of digital
              consent in your jurisdiction) to use Subwatch. By using the
              service, you represent that you meet this requirement and that you
              have the legal capacity to enter into these Terms.
            </p>
          ),
        },
        {
          id: "user-responsibilities",
          heading: "Your Responsibilities",
          content: (
            <>
              <p>You agree not to:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Use Subwatch for any unlawful purpose or in violation of these
                  Terms.
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the
                  service, other accounts, or related systems.
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of
                  Subwatch, including through malware, scraping, or excessive
                  automated requests.
                </li>
                <li>
                  Reverse engineer, decompile, or attempt to extract the source
                  code of the service, except where permitted by law.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "subscription-billing",
          heading: "Subscriptions and Billing",
          content: (
            <p>
              If Subwatch offers a paid plan, fees and billing cycles will be
              disclosed at the time of purchase. Paid plans renew automatically
              at the end of each billing period unless cancelled before the
              renewal date. You can cancel at any time through your account
              settings; cancellation takes effect at the end of the current
              billing period, and we generally do not provide refunds for
              partial periods except where required by law.
            </p>
          ),
        },
        {
          id: "user-content",
          heading: "Your Content",
          content: (
            <p>
              You retain ownership of the information you enter into Subwatch,
              such as your subscription list and related notes (&quot;User
              Content&quot;). By submitting User Content, you grant us a limited
              license to store, process, and display it back to you solely for
              the purpose of operating the service.
            </p>
          ),
        },
        {
          id: "intellectual-property",
          heading: "Intellectual Property",
          content: (
            <p>
              Subwatch, including its design, features, logos, and underlying
              code, is owned by us or our licensors and is protected by
              copyright, trademark, and other intellectual property laws. These
              Terms do not grant you any right to use our branding or trademarks
              without prior written consent.
            </p>
          ),
        },
        {
          id: "third-party-services",
          heading: "Third-Party Services",
          content: (
            <p>
              Subwatch may let you sign in through, or link to, third-party
              services such as Google. We are not responsible for the practices
              or content of third-party services, and your use of them is
              governed by their own terms and privacy policies.
            </p>
          ),
        },
        {
          id: "termination",
          heading: "Termination",
          content: (
            <p>
              You may stop using Subwatch and delete your account at any time.
              We may suspend or terminate your access if you violate these
              Terms, create risk or legal exposure for us, or if required by
              law. Upon termination, your right to use the service will
              immediately cease.
            </p>
          ),
        },
        {
          id: "disclaimers",
          heading: "Disclaimers",
          content: (
            <p>
              Subwatch is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, whether express or
              implied, including warranties of merchantability, fitness for a
              particular purpose, and non-infringement. We do not guarantee that
              the service will be uninterrupted, error-free, or that renewal
              dates and reminders will always be accurate.
            </p>
          ),
        },
        {
          id: "limitation-of-liability",
          heading: "Limitation of Liability",
          content: (
            <p>
              To the maximum extent permitted by law, Subwatch and its
              affiliates will not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits, data, or goodwill, arising out of or related to your use
              of the service, even if advised of the possibility of such
              damages.
            </p>
          ),
        },
        {
          id: "governing-law",
          heading: "Governing Law",
          content: (
            <p>
              These Terms are governed by the laws of the jurisdiction in which
              Subwatch is established, without regard to its conflict-of-law
              principles. Any disputes arising from these Terms will be resolved
              in the courts of that jurisdiction, unless otherwise required by
              applicable law.
            </p>
          ),
        },
        {
          id: "changes-to-terms",
          heading: "Changes to These Terms",
          content: (
            <p>
              We may update these Terms from time to time. If we make material
              changes, we will notify you by email or through an in-product
              notice before the changes take effect. Continuing to use Subwatch
              after changes become effective constitutes acceptance of the
              revised Terms.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact Us",
          content: (
            <p>
              If you have questions about these Terms, contact us at{" "}
              <a
                href="mailto:support@subwatch.app"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                support@subwatch.app
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  )
}
