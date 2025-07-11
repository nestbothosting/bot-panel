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
        disallow: ['/admin', '/admin/', '/admin/*', '/admins', '/admins/'],
      },
    ],
    sitemap: 'https://nestbot.xyz/sitemap.xml',
  },
};
