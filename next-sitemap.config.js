/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nestbot.xyz',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*', '/admins', '/admins/*','/api','/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/', '/admins/'],
        allow: '/', 
      },
    ],
    sitemap: 'https://nestbot.xyz/sitemap.xml',
  },
};
