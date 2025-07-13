/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nestbot.xyz',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/admins', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admins', '/api'],
      },
    ],
  },
}
