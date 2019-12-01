const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Jacob D. Castro',
    siteUrl: 'https://jacobdcastro.com',
  },

  pathPrefix: '/blog',
  pathPrefix: '/tutorials',

  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jacob D. Castro',
        short_name: 'JDCastro',
        start_url: '/',
        background_color: '#000',
        theme_color: '#353535',
        lang: 'en',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: path.join(__dirname, 'src', 'images', 'favicon.png'), // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        // Add any options here
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'content'),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-130258530-1',
        head: false,
        anonymize: true,
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Enables Google Optimize using your container Id
        // optimizeId: `YOUR_GOOGLE_OPTIMIZE_TRACKING_ID`,

        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        // cookieDomain: `jacobdcastro.com`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: path.join(__dirname, 'src', 'utils', 'typography'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: path.join(
          __dirname,
          'src',
          'utils',
          'robots-txt.config.js'
        ),
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-lodash',
  ],
};
