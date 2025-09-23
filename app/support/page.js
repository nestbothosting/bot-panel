// app/support/page.js
import AdBanner from '@/components/Banner/Banner';
import styles from './support.module.css'

export const metadata = {
  title: 'NestBot Support',
  description: 'Need help with NestBot? Visit our support page for help articles, troubleshooting guides, and contact information.',
  keywords: ['nestbot support', 'help with discord bot', 'discord bot issue', 'nestbot help', 'nestbot contact']
};

export default function Page() {
  return (
    <main className={styles.supportPage}>
      <h1>Support</h1>
      <p>If you need help with NestBot, you can contact us via:</p>
      <ul className={styles.contactList}>
        <li>
          📧 Email: <a href="mailto:support@nestbot.xyz">support@nestbot.xyz</a>
        </li>
        <li>
          💬 Discord: <a href="https://discord.gg/J83zQvaV6U" target="_blank" rel="noopener noreferrer">Join our Discord server</a>
        </li>
      </ul>
      <p>We typically respond within 24 hours. Thank you for using NestBot!</p>
      <AdBanner />
    </main>
  );
}
