const path = require('path');

module.exports = {
  pathPrefix: '/blog',

  siteMetadata: {
    title: 'Jacob D. Castro',
  },

  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jacob D. Castro Personal website',
        short_name: 'JDCastro',
        start_url: '/',
        background_color: '#fafafa',
        theme_color: '#353535',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
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
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jacob D. Castro Personal Website',
        short_name: 'personal',
        start_url: '/',
        icon: 'src/images/jdc-favicon.png', // This path is relative to the root of the site.
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
        // optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',

        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        // cookieDomain: 'jacobdcastro.com',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-lodash',
  ],
};
