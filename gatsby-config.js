module.exports = {
	siteMetadata: {
		title: 'Jacob D. Castro',
		desc: 'A personal, information website and design/development playground for Jacob D. Castro',
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
			resolve: 'gatsby-source-contentful',
			options: {
				spaceId: 'oghc6wtiomc3',
				accessToken: '9f37d0ec8416ebe8c9c11b5db58b1a85d39c0f369f15fcc863b47f53c32179e7',
			},
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Jacob D. Castro Personal Website',
				short_name: 'personal',
				start_url: '/',
				icon: 'src/images/jdc-favicon.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline',
	],
};
