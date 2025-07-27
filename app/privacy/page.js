// app/privacy/page.js
import styles from './privacy.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Understand how NestBot collects, uses, and protects your data when using our Discord bot services and dashboard.',
  keywords: ['nestbot privacy', 'data usage', 'privacy policy', 'discord bot privacy', 'user data protection']
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.privacyPage}>
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At NestBot, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </p>
      </section>

      <section>
        <h2>2. Data We Collect</h2>
        <p>We may collect the following types of data:</p>
        <ul>
          <li>Discord User ID and server information</li>
          <li>Bot activity logs and usage analytics</li>
          <li>Email address (for support or premium access)</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Operate and improve our services</li>
          <li>Provide support and respond to inquiries</li>
          <li>Enable premium features and manage subscriptions</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell or share your data with third parties, except as required by law or to provide essential services (e.g., payment processing).
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your data. However, no system is 100% secure, so we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          We may use cookies to improve your experience on our site. You can choose to disable cookies in your browser settings.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion of your personal data. Contact us anytime at <a href="mailto:support@nestbot.xyz">support@nestbot.xyz</a>.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage you to review it regularly.
        </p>
      </section>

      <p className={styles.updated}>Last updated: June 2025</p>
    </main>
  );
}
