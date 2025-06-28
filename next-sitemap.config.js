/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nestbot.xyz',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*', '/admins'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/admins'],
      },
    ],
    sitemap: 'https://nestbot.xyz/sitemap.xml',
  },
};
