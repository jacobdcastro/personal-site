const path = require('path');

module.exports = {
	siteMetadata: {
		title: 'Jacob D. Castro',
		desc: 'A personal, informational website and design/development playground for Jacob D. Castro',
	},
	pathPrefix: '/blog',
	plugins: [
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
			resolve: 'gatsby-source-contentful',
			options: {
				//SPACE_ID build environment variable from Netlify or Gatsby?
				spaceId: 'oghc6wtiomc3',
				//DELIVERY_API_TOKEN build environment variable from Netlify or Gatsby?
				accessToken: '9f37d0ec8416ebe8c9c11b5db58b1a85d39c0f369f15fcc863b47f53c32179e7',
			},
		},
		// {
		// 	resolve: 'gatsby-plugin-eslint',
		// 	options: {
		// 		test: /\.js$|\.jsx$/,
		// 		exclude: /(node_modules|cache|public)/,
		// 		options: {
		// 			emitWarning: true,
		// 			failOnError: false
		// 		}
		// 	}
		// },
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
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-130258530-1",
				head: false,
				anonymize: true,
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: [],
				// Enables Google Optimize using your container Id
				// optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",

				// Any additional create only fields (optional)
				sampleRate: 5,
				siteSpeedSampleRate: 10,
				// cookieDomain: "jacobdcastro.com",
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
