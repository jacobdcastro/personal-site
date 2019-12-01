// ? loaded in gatsby-config.js for gatsby-plugin-robots-txt

const NODE_ENV = process.env.NODE_ENV;
const NETLIFY_SITE_URL = process.env.URL || 'https://jacobdcastro.com/';
const NETLIFY_DEPLOY_URL = process.env.DEPLOY_PRIME_URL || NETLIFY_SITE_URL;
const NETLIFY_ENV = process.env.CONTEXT || NODE_ENV;

const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  resolveEnv: () => NETLIFY_ENV,
  env: {
    production: {
      policy: [{ userAgent: '*', disallow: '/form-success' }],
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    },
    'branch-deploy': {
      policy: [{ userAgent: '*', disallow: ['/'] }],
      sitemap: null,
      host: null,
    },
    'deploy-preview': {
      policy: [{ userAgent: '*', disallow: ['/'] }],
      sitemap: null,
      host: null,
    },
    development: {
      policy: [{ userAgent: '*', disallow: ['/'] }],
    },
  },
};
