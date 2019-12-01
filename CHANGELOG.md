# Changelog

All notable changes will be documented right here.
_Commits featuring only new blog posts will not be documented and will not affect verion number._
Blog posts edits (typos, code snippets, content embeds, etc.) will be included in patch releases.

## [Unreleased]

- Email newsletter subscription form
- Netlify functions to use with Mailchimp API.
- Blog post drafts (content/blogPosts/drafts)
- "Talks" page featuring public speaking gigs
- Netlify functions for contact form
- "Work" page for portfolio
- Jest testing w/ react-testing-library

## [2.3.1] - 2019-12-01

### Added

- fadeInUpward animation to social icons
- PropTypes to Helmet.js

### Changed

- Moved robots.txt config and environment check to own file in src/utils
- Prettify gatsby-config.js
- Update README

## [2.3.0] - 2019-11-29

### Added

- Animation on index headline
- Resume to filesystem
- New icon for resume
- Tags to /blog page listings

### Changed

- Buttons on blog listings
- Colors of blog post tags from black to purple
- SVG components prettified

## [2.2.3] - 2019-11-24

### Changed

- Robots.txt plugin config (fixed Google crawl issue)

## [2.2.2] - 2019-11-22

### Added

- ESLint rules (no-unused-vars, incl. jsx)
- Description on contact page
- Add images to SEO for pages missing it

### Changed

- Single quotes for ESLint rules

## [2.2.1] - 2019-11-20

### Changed

- Fixed site url in Netlify environment check (gatsby-config.js)

## [2.2.0] - 2019-11-19

### Added

- Contact page ([jacobdcastro.com/contact](https://jacobdcastro.com/contact))
- Contact form success page ([jacobdcastro.com/form-success](https://jacobdcastro.com/form-success))
- Encode function for encoding axios requests (src/utils/encode.js)
- Prop type checking on all components w/ PropTypes
- Netlify environment checking, preventing crawling on branch/preview deploys (gatsby-config.js)
- Some 'TODO' comments

### Changed

- Styled-components rule name (eslint)
- Disallow crawling on contact form success page

### Removed

- Unused code and files from v1

## [2.1.0] - 2019-11-15

### Changed

- Updated all outdated packages
  - gatsby-plugin-lodash@3.1.15
  - gatsby-plugin-sitemap@2.2.21
  - gatsby-plugin-react-helmet@3.1.15
  - gatsby-plugin-eslint@2.0.8
  - gatsby-plugin-google-analytics@2.1.27
  - gatsby-image@2.2.33
  - eslint-config-prettier@6.5.0
  - gatsby-plugin-typography@2.3.17
  - gatsby-remark-prismjs@3.3.23
  - gatsby-plugin-sharp@2.3.0
  - gatsby-plugin-manifest@2.2.28
  - gatsby-transformer-sharp@2.3.5
  - gatsby-plugin-styled-components@3.1.13
  - gatsby-transformer-remark@2.6.35
  - prettier@1.19.1
  - gatsby@2.17.15
  - react@16.12.0
  - gatsby-source-filesystem@2.1.37
  - webpack-dev-server@3.9.0
  - react-moment@0.9.6
  - react-dom@16.12.0
  - styled-components@4.4.1

## [2.0.2] - 2019-09-26

### Added

- Prettier config file
- eslint-config-prettier package

### Changed

- Format all .md blog posts
- Eslint config adjustments
- "blogPosts" folder in /static renamed to "images"

## [2.0.1] - 2019-09-23

### Added

- Image alt data in SEO objects for each page
- Twitter card meta data
- Person schema.org markup items
- Version of site with link to releases page in footer

### Changed

- Fix "portrait" bug
- Rewrite mini biography in third person
- Title meta tag to include job description
- Fixed typo in footer

### Removed

- All console.log() from main build files

## [2.0.0] - 2019-09-22

### Added

- Markdown-based CMS in "./content".
- Open graph, Twitter, and html meta tags on each page for SEO.
- [JSON-LD](https://json-ld.org) markup ([schema.org](https://schema.org)) based on [Google's SEO standards](https://developers.google.com/search/docs/guides/intro-structured-data).
- Dark/Light theme toggle button
- Tutorials page
- "Time to read" and "Approx. time to complete" on blog posts and tutorials
- Changelog

### Changed

- All icons are now SVG filetypes
- New visual identity by [@jacobdcastro](https://github.com/jacobdcastro).
- Styles folder containing styled-components code instead of styled-components code in same file as components in which it's styling.

### Removed

- [Contentful](https://contentful.com/) integration as the CMS
- Contact forms

## [1.0.0] - 2019

### Added

- Brand new website with Gatsby.
- Versioning undocumented
