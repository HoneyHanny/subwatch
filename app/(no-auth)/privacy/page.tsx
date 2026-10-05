import { LegalLayout } from "@/components/LegalLayout"

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      lastUpdated="August 2, 2026"
      sections={[
        {
          id: "introduction",
          heading: "Introduction",
          content: (
            <p>
              Subwatch (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              provides a service that helps you track and manage your
              recurring subscriptions. This Privacy Policy explains what
              information we collect, how we use it, and the choices you
              have. By using Subwatch, you agree to the collection and use
              of information as described here.
            </p>
          ),
        },
        {
          id: "information-we-collect",
          heading: "Information We Collect",
          content: (
            <>
              <p>
                <span className="font-medium text-foreground">
                  Account information —
                </span>{" "}
                your name, email address, and password (or, if you sign in
                with Google, the basic profile information Google shares
                with us) when you create an account.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Subscription data —
                </span>{" "}
                details you enter about the services you subscribe to, such
                as merchant name, cost, billing cycle, and renewal date.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Usage data —
                </span>{" "}
                information about how you interact with Subwatch, including
                device type, browser, IP address, pages visited, and
                timestamps, collected automatically through cookies and
                similar technologies.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use-information",
          heading: "How We Use Your Information",
          content: (
            <p>
              We use the information we collect to provide and improve the
              service, send renewal reminders and account notifications,
              respond to support requests, detect and prevent fraud or
              abuse, and understand how Subwatch is used so we can make it
              better. We do not use your subscription data to sell you
              third-party advertising.
            </p>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies and Tracking Technologies",
          content: (
            <p>
              We use cookies and similar technologies to keep you signed
              in, remember your preferences, and understand aggregate usage
              patterns. You can instruct your browser to refuse cookies,
              though some parts of Subwatch may not function properly
              without them.
            </p>
          ),
        },
        {
          id: "sharing",
          heading: "How We Share Information",
          content: (
            <>
              <p>
                We do not sell your personal information. We may share
                information with:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Service providers who help us operate Subwatch (hosting,
                  email delivery, analytics), bound by confidentiality
                  obligations.
                </li>
                <li>
                  Authorities, when required by law, regulation, or valid
                  legal process.
                </li>
                <li>
                  A successor entity, in the event of a merger, acquisition,
                  or sale of assets, subject to the same privacy
                  commitments described here.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "google-oauth",
          heading: "Signing In With Google",
          content: (
            <p>
              If you choose to sign in with Google, we receive only the
              basic profile information (name, email address, profile
              photo) that you authorize Google to share. We do not access
              your Gmail, Google Drive, or any other Google data, and our
              use of information received from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Google API Services User Data Policy
              </a>
              , including its Limited Use requirements.
            </p>
          ),
        },
        {
          id: "data-security",
          heading: "Data Security",
          content: (
            <p>
              We use industry-standard safeguards — including encryption in
              transit, access controls, and regular security review — to
              protect your information. No method of transmission or
              storage is completely secure, so we cannot guarantee absolute
              security.
            </p>
          ),
        },
        {
          id: "data-retention",
          heading: "Data Retention",
          content: (
            <p>
              We retain your information for as long as your account is
              active or as needed to provide the service. If you delete
              your account, we will delete or anonymize your personal
              information within a reasonable period, except where we are
              required to retain it for legal or legitimate business
              purposes.
            </p>
          ),
        },
        {
          id: "your-rights",
          heading: "Your Rights and Choices",
          content: (
            <p>
              Depending on where you live, you may have the right to
              access, correct, export, or delete your personal information,
              and to object to or restrict certain processing. You can
              manage most of this directly from your account settings, or
              contact us using the details below to make a request.
            </p>
          ),
        },
        {
          id: "childrens-privacy",
          heading: "Children's Privacy",
          content: (
            <p>
              Subwatch is not directed to children under 13 (or the
              equivalent minimum age in your jurisdiction), and we do not
              knowingly collect personal information from children. If you
              believe a child has provided us with personal information,
              please contact us so we can delete it.
            </p>
          ),
        },
        {
          id: "international-transfers",
          heading: "International Data Transfers",
          content: (
            <p>
              We may process and store your information in countries other
              than your own. Where required, we rely on appropriate
              safeguards, such as standard contractual clauses, to protect
              information transferred internationally.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to This Policy",
          content: (
            <p>
              We may update this Privacy Policy from time to time. If we
              make material changes, we will notify you by email or through
              an in-product notice before the changes take effect. The
              &quot;Last updated&quot; date at the top of this page
              reflects the most recent revision.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact Us",
          content: (
            <p>
              If you have questions about this Privacy Policy or how we
              handle your information, contact us at{" "}
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