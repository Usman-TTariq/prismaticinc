import { LegalDocumentShell, LegalH2, LegalP, LegalUl } from "./LegalDocumentShell";

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentShell
      title="Privacy Policy"
      subtitle="How PrismaTech Inc. collects, uses, and protects information when you use our website and services."
      updated="May 1, 2026"
    >
      <section className="space-y-4">
        <LegalH2>Introduction</LegalH2>
        <LegalP>
          PrismaTech Inc. (“PrismaTech,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy describes how we
          handle information in connection with this website and related marketing or consultation services you request
          from us. By using our site or submitting information to us, you agree to this policy.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Information we collect</LegalH2>
        <LegalP>We may collect the following categories of information, depending on how you interact with us:</LegalP>
        <LegalUl>
          <li>
            <span className="font-medium text-[#e0e0e0]">Contact and inquiry data:</span> name, email address, phone
            number, company name, and messages you send through forms, email, or consultation requests.
          </li>
          <li>
            <span className="font-medium text-[#e0e0e0]">Technical data:</span> IP address, browser type, device type,
            general location (region), pages viewed, and timestamps—typically collected via logs or analytics tools.
          </li>
          <li>
            <span className="font-medium text-[#e0e0e0]">Communications:</span> records of correspondence if you contact
            us for support, proposals, or project discussions.
          </li>
        </LegalUl>
      </section>

      <section className="space-y-4">
        <LegalH2>How we use information</LegalH2>
        <LegalP>We use the information we collect to:</LegalP>
        <LegalUl>
          <li>Respond to inquiries, schedule consultations, and deliver our digital marketing and related services.</li>
          <li>Operate, secure, and improve our website and internal business processes.</li>
          <li>Send transactional messages (for example, confirmations) and, where permitted, marketing you have opted into.</li>
          <li>Comply with law, enforce our agreements, and protect the rights and safety of PrismaTech and others.</li>
        </LegalUl>
      </section>

      <section className="space-y-4">
        <LegalH2>Cookies and similar technologies</LegalH2>
        <LegalP>
          We may use cookies, local storage, or similar technologies to remember preferences, measure site performance,
          and understand how visitors use our pages. You can control cookies through your browser settings; disabling
          cookies may limit certain features.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Sharing and processors</LegalH2>
        <LegalP>
          We do not sell your personal information. We may share data with trusted service providers (such as hosting,
          email delivery, analytics, or CRM platforms) who process it on our instructions and are bound by appropriate
          confidentiality and security obligations. We may also disclose information if required by law or to protect our
          legitimate interests in accordance with applicable regulations.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Retention and security</LegalH2>
        <LegalP>
          We retain information only as long as needed for the purposes described above, unless a longer period is
          required by law. We implement reasonable administrative, technical, and organizational measures designed to
          protect personal information—no method of transmission over the Internet is completely secure.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Your choices and rights</LegalH2>
        <LegalP>
          Depending on where you live, you may have rights to access, correct, delete, or restrict processing of your
          personal information, or to object to certain processing. To exercise these rights, contact us using the details
          below. You may unsubscribe from marketing emails at any time via the link in those messages.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Children</LegalH2>
        <LegalP>
          Our services are not directed to children under 16, and we do not knowingly collect personal information from
          them. If you believe we have collected such information, please contact us so we can delete it.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>International visitors</LegalH2>
        <LegalP>
          If you access our site from outside the United States, your information may be processed in the United States
          or other countries where we or our providers operate, which may have different data protection rules than your
          jurisdiction.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Changes to this policy</LegalH2>
        <LegalP>
          We may update this Privacy Policy from time to time. We will post the revised version on this page and update
          the “Last updated” date. Continued use of the site after changes constitutes acceptance of the updated policy.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact us</LegalH2>
        <LegalP>
          Questions about this Privacy Policy or our data practices:{" "}
          <a href="mailto:info@prismatechinc.com" className="font-semibold text-white underline decoration-[#bc13fe]/50 underline-offset-2 hover:decoration-[#bc13fe]">
            info@prismatechinc.com
          </a>
          .
        </LegalP>
      </section>
    </LegalDocumentShell>
  );
}
