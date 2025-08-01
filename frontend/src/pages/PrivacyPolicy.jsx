import "@/styles/page/_privacy-policy.scss";
import { useTranslation } from "@/services/translation";
import { oykDate } from "@/utils/formatters";

export default function PrivacyPolicy() {
  const { t, lang } = useTranslation();

  return (
    <section className="oyk-page oyk-privacy-policy">
      <div className="oyk-privacy-policy-container">
        <h1 className="oyk-privacy-policy-title">{t("Privacy Policy")}</h1>
        
        <div className="oyk-privacy-policy-content">
          <p className="oyk-privacy-policy-last-updated">
            Last updated: {oykDate(new Date(), "date", lang)}
          </p>

          <section className="oyk-privacy-policy-section">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how Oykus ("we", "our", or "us") collects, uses, and protects your personal information when you use our application. We are committed to protecting your privacy and ensuring compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec's Act Respecting the Protection of Personal Information in the Private Sector.
            </p>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>2. Data Controller</h2>
            <p>
              Oykus, a Canadian business operating in Quebec, is responsible for processing your personal information. If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>3. Personal Information We Collect</h2>
            
            <h3>3.1 Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
              <li>Email address (for authentication and communication)</li>
              <li>Username (for authentication)</li>
              <li>Password (for authentication; encrypted and securely stored)</li>
              <li>Player name (for display purposes)</li>
            </ul>

            <h3>3.2 Application Preferences</h3>
            <p>We store your application preferences locally:</p>
            <ul>
              <li>Sidebar open/close state</li>
              <li>Current active world selection</li>
              <li>User interface preferences</li>
            </ul>

            <h3>3.3 Content and Usage Data</h3>
            <p>When you use our application, we collect:</p>
            <ul>
              <li>Worlds you create and manage</li>
              <li>Tasks, comments, and related content</li>
              <li>Task statuses, priorities, and assignments</li>
              <li>World themes and customizations</li>
              <li>Task history and change logs</li>
              <li>Timestamps of activities and modifications</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>4. Legal Basis for Processing</h2>
            <p>We process your personal information based on the following legal grounds:</p>
            <ul>
              <li><strong>Consent:</strong> When you provide explicit consent for specific purposes</li>
              <li><strong>Contract Performance:</strong> To provide you with our services and maintain your account</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and ensure security</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>5. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Provide and maintain our application services</li>
              <li>Authenticate your identity and secure your account</li>
              <li>Store and manage your content (worlds, tasks, comments)</li>
              <li>Remember your preferences and settings</li>
              <li>Track task history and changes for audit purposes</li>
              <li>Improve our services and user experience</li>
              <li>Ensure application security and prevent fraud</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>6. Data Storage and Security</h2>
            <p>Your information is stored securely using:</p>
            <ul>
              <li>Encrypted passwords and secure authentication</li>
              <li>Database security measures</li>
              <li>Local storage for preferences (browser-based)</li>
              <li>Regular security updates and monitoring</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>7. Data Retention</h2>
            <p>We retain your personal information for as long as:</p>
            <ul>
              <li>Your account remains active</li>
              <li>Required to provide our services</li>
              <li>Necessary to comply with legal obligations</li>
            </ul>
            <p>You may request deletion of your account and associated information at any time.</p>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>8. Your Rights</h2>
            <p>Under Canadian privacy laws, you have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Correct inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where applicable</li>
              <li><strong>Complaint:</strong> File a complaint with the Privacy Commissioner of Canada or Quebec's Commission d'accès à l'information</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>9. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in operating our application (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>10. Cookies and Local Storage</h2>
            <p>We use local storage to remember your preferences and authentication state. This includes:</p>
            <ul>
              <li>Authentication tokens</li>
              <li>User profile information</li>
              <li>Application preferences (sidebar state, current world)</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>11. Data Location</h2>
            <p>Your personal information is processed and stored within Canada, primarily in Quebec, in compliance with Canadian privacy laws and regulations.</p>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>12. Children's Privacy</h2>
            <p>Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>13. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>14. Contact Information</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <ul>
              <li>Email: [Contact email to be provided]</li>
              <li>Address: [Contact address to be provided]</li>
            </ul>
          </section>

          <section className="oyk-privacy-policy-section">
            <h2>15. Complaints</h2>
            <p>If you believe we have not addressed your concerns satisfactorily, you have the right to lodge a complaint with:</p>
            <ul>
              <li>The Privacy Commissioner of Canada</li>
              <li>Quebec's Commission d'accès à l'information (if you are a Quebec resident)</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
