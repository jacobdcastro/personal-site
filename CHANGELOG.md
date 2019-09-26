# Changelog

All notable changes will be documented right here.
_Commits featuring only new blog posts will not be documented and will not affect verion number._
Blog posts edits (typos, code snippets, content embeds, etc.) will be included in patch releases.

## [Unreleased]

- Email newsletter subscription form
- Netlify functions to use with Mailchimp API.
- Blog post drafts
- "Talks" page featuring public speaking gigs

## [2.0.2] - 2019-09-26

### Added

- Prettier config file

### Changed

- Format all .md blog posts

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
