import { LegalDocumentShell, LegalH2, LegalP, LegalUl } from "./LegalDocumentShell";

export default function TermsOfServicePage() {
  return (
    <LegalDocumentShell
      title="Terms of Service"
      subtitle="Rules and conditions for using the PrismaTech Inc. website and engaging our digital marketing services."
      updated="May 1, 2026"
    >
      <section className="space-y-4">
        <LegalH2>Agreement to terms</LegalH2>
        <LegalP>
          These Terms of Service (“Terms”) govern your access to and use of the website and online properties operated by
          PrismaTech Inc. (“PrismaTech,” “we,” “us”). By accessing or using the site, you agree to these Terms. If you do
          not agree, do not use the site. Separate written agreements may apply to specific projects or campaigns we run
          for you.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Services and information</LegalH2>
        <LegalP>
          Content on this site—including case studies, descriptions, and performance claims—is for general information
          and marketing purposes. It does not guarantee specific business outcomes. Proposals, statements of work, or
          contracts signed with PrismaTech supersede conflicting descriptions on the website.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Acceptable use</LegalH2>
        <LegalP>You agree not to:</LegalP>
        <LegalUl>
          <li>Use the site in any way that violates applicable law or infringes others’ rights.</li>
          <li>Attempt to gain unauthorized access to our systems, other users, or third-party networks.</li>
          <li>Transmit malware, spam, or harmful code; scrape or harvest data in bulk without our written consent.</li>
          <li>Misrepresent your identity or affiliation when contacting us or submitting forms.</li>
        </LegalUl>
      </section>

      <section className="space-y-4">
        <LegalH2>Intellectual property</LegalH2>
        <LegalP>
          The site’s design, text, graphics, logos, and other materials are owned by PrismaTech or our licensors and are
          protected by copyright, trademark, and other laws. You may not copy, modify, distribute, or create derivative
          works without our prior written permission, except for temporary copies in your browser cache for personal,
          non-commercial viewing.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>User submissions</LegalH2>
        <LegalP>
          If you submit ideas, feedback, or materials through the site, you grant us a non-exclusive, worldwide,
          royalty-free license to use, reproduce, and display them for the purpose of evaluating and providing our
          services, unless we agree otherwise in writing. You represent that you have the rights to grant this license.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Third-party links</LegalH2>
        <LegalP>
          Our site may link to third-party websites or tools. We are not responsible for their content, privacy practices,
          or availability. Your use of third-party services is at your own risk and subject to their terms.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Disclaimer of warranties</LegalH2>
        <LegalP>
          The site and all content are provided “as is” and “as available” without warranties of any kind, whether
          express or implied, including implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful
          components.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Limitation of liability</LegalH2>
        <LegalP>
          To the fullest extent permitted by law, PrismaTech and its directors, employees, and affiliates shall not be
          liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits,
          data, or goodwill, arising from your use of the site or inability to use it—even if we have been advised of the
          possibility of such damages. Our aggregate liability for claims relating to the site shall not exceed the
          greater of one hundred U.S. dollars (USD $100) or the amounts you paid us specifically for site-related services
          in the twelve months preceding the claim.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Indemnity</LegalH2>
        <LegalP>
          You agree to defend, indemnify, and hold harmless PrismaTech from any claims, damages, losses, or expenses
          (including reasonable attorneys’ fees) arising from your violation of these Terms, misuse of the site, or
          violation of third-party rights.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Governing law</LegalH2>
        <LegalP>
          These Terms are governed by the laws of the State of California, United States, without regard to conflict-of-law
          principles. Courts located in California shall have exclusive jurisdiction over disputes arising from these
          Terms or the site, subject to any mandatory consumer protections in your place of residence.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Changes</LegalH2>
        <LegalP>
          We may modify these Terms at any time by posting an updated version on this page and revising the “Last updated”
          date. Material changes may be communicated through the site or by email where appropriate. Your continued use
          after changes become effective constitutes acceptance.
        </LegalP>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact</LegalH2>
        <LegalP>
          For questions about these Terms:{" "}
          <a href="mailto:info@prismatechinc.com" className="font-semibold text-white underline decoration-[#bc13fe]/50 underline-offset-2 hover:decoration-[#bc13fe]">
            info@prismatechinc.com
          </a>
          .
        </LegalP>
      </section>
    </LegalDocumentShell>
  );
}
