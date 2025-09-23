import AdBanner from '@/components/Banner/Banner';
import styles from './terms.module.css';

export const metadata = {
  title: 'Terms and Conditions',
  description: 'Read the full terms and conditions for using NestBot, including usage policies, rights, and restrictions.',
  keywords: ['nestbot terms', 'terms of service', 'bot usage terms', 'discord bot rules', 'nestbot agreement']
};

export default function TermsPage() {
  return (
    <main className={styles.termsPage}>
      <AdBanner />
      <h1>Terms & Conditions</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to NestBot. By accessing or using our service, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the service.
        </p>
      </section>

      <section>
        <h2>2. Use of Service</h2>
        <p>
          You agree to use NestBot only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use and enjoyment of the service.
        </p>
        <ul>
          <li>No spam or automated abuse.</li>
          <li>No attempts to reverse engineer or exploit the platform.</li>
          <li>Respect other users and maintain a professional environment.</li>
        </ul>
      </section>

      <section>
        <h2>3. Premium Features</h2>
        <p>
          Premium plans grant access to additional tools and capabilities. These features may change or be removed at our discretion. Refunds are only issued in accordance with our refund policy.
        </p>
      </section>

      <section>
        <h2>4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to our services at any time, without notice, for violations of these terms or abuse of the service.
        </p>
      </section>

      <section>
        <h2>5. Data and Privacy</h2>
        <p>
          We take your privacy seriously. Your data is stored securely and is not shared with third parties, except as required by law. Please read our <a href="/privacy">Privacy Policy</a> for more details.
        </p>
      </section>

      <section>
        <h2>6. Changes to These Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Continued use of the service after changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For questions or concerns, please contact us at <a href="mailto:support@nestbot.xyz">support@nestbot.xyz</a>.
        </p>
      </section>

      <p className={styles.updated}>Last updated: June 2025</p>
      <AdBanner />
    </main>
  );
}
