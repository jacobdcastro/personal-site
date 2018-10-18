module.exports = {
  siteMetadata: {
    title: 'Jacob D. Castro',
    desc: 'A personal, information website and design/development playground for Jacob D. Castro',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Jacob D. Castro Personal Website',
        short_name: 'personal',
        start_url: '/',
        icon: 'src/images/jdc-favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
