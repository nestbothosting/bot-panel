'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <h1>NextBot</h1>
          <p>Powerful no-code Discord bot tools for everyone.</p>
        </div>

        <div className={styles.footerLinks}>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/botstatus">Bot Status</Link></li>
              <li><Link href="/settings">Settings</Link></li>
              <li><Link href="/premium">Premium</Link></li>
            </ul>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li>
                <a href="https://discord.gg/J83zQvaV6U" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} NextBot. All rights reserved.</p>
      </div>
    </footer>
  );
}
