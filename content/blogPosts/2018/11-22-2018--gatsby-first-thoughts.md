---
slug: "gatsby-first-thoughts"
title: "Gatsby First Thoughts"
subtitle: "I built my website in Gatsby and I'm in love"
image: "sandro-katalina-457230-unsplash.jpg"
imageTitle: "Purple Triangle Neon Lights"
imageAlt: "Purple neon lights in dark, triangle hallway"
date: "2018-11-22T00:00:00-07:00"
tags:
  - "life"
  - "website"
type: "blogPost"
---

In the last 3-4 months, I've dedicated myself to learning React. I've been on Javascript for the last year or so and decided it was time to learn a framework/library to expand my Javascript skills. Javascript always excited me. And hearing a lot about frameworks such as Angular, React, Vue, and, formerly, Ember, made me super curious about what they were and why I would need to use one.

After exploring the massive Javascript world, I made my decision on React. It seemed the most promising and it looked like it had a bright, long future that could help kick off my career in web development. But I soon had a slightly scary realization: the React ecosystem is gigantic in itself. There were extensions and libraries and frameworks for React that made it all seem so intense.

I pushed all of the React craze aside and started with the React Basics course on Treehouse. My first React environment I learned was Create React App. It was an awesome experience!! I really loved React and it actually really made sense to me. I caught on pretty quickly!

## Converting My Website

By this time, I had already created my website in vanilla HTML, CSS, and (a little bit of) JS. So decided to convert it to React using Create React App.

After lots of copying and pasting, figuring out how to style things in React (styled components ftw), and stretching my limited React skills, I did it. My first React site was on the web. Netlify made it super easy to do so (more on Netlify in a future blog post).

Unfortunately, my newly developed site was oddly slow. I wasn't sure why and I tried doing things to optimize performance but it never really helped. After all, my website was not a single page app. Create React App is amazing for single page apps but I felt there were better solutions out there for my small, personal website.

After searching through lots of solutions, I decided on one that seemed to be getting a lot more hype than other React frameworks. And that was Gatsby.

## Refactoring to Gatsby

Gatsby looked so interesting. I loved their website, I admired how fast it was (assuming it was also built on Gatsby), and I only saw extremely positive comments on Twitter about it. People were all for it!

I went to the docs and went through the tutorial.

Wow. It was so easy, awesomely intuitive, and surprisingly fun! I just had to go with Gatsby. It made so much sense for my site since Gatsby specializes in static sites. It had a perfect system for pages similar to how you'd have multiple pages in a normal HTML-developed site. It made so much sense.

After lots of stumbling over myself, reading through the docs, and trying to re-do all my Create React App website, I finally converted it. And wow, my website's performance improved by a long shot. Some may say, it is blazingly fast (at least compared to my site on Create React App).

## Adding THIS Blog

My site at this point only featured the home, about, and contact pages. That's a bit boring, so I wanted to add a blog. So I set my next task to figuring out how the heck I'd do that. I decided on Contentful for my CMS (definitely a blog post on this soon).

I knew I wouldn't be making this blog to be perfect on the first try. It'll be a little side project to improve over time as my skills progress.

I started by making the blog home page and that was pretty simple and straight forward. The more difficult part was making the pages for each blog post. The Gatsby Node API `createPages` made it super easy!

I started by following along with a tutorial on Youtube explaining how to use Contentful with Gatsby. After that tutorial, I really began to understand Gatsby. This is what I finished in my `gatsby-node.js` file:

```javascript
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve("src/templates/BlogPost.js");
    resolve(
      graphql(`
        {
          allContentfulBlogPost(limit: 100) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.allContentfulBlogPost.edges.forEach(edge => {
          createPage({
            path: `blog/${edge.node.slug}`,
            component: blogPostTemplate,
            context: {
              slug: edge.node.slug,
            },
          });
        });

        return;
      })
    );
  });
};
```

Creating the pages is super easy with the `createPages` Gatsby API. Not to mention, Contentful can automatically generate a slug for the URL. On my project, I have the slugs set to be the title of the blog post. For example, a blog post titled "Hello World In Javascript" would have its own page at jacobdcastro.com/blog/hello-world-in-javascript/. These tools make it so easy!

Once the pages are created behind the scenes in Gatsby, it uses a template to generate the markup for each page. So each blog post page is based on the same template. I love reusing code.

## Using GraphQL

One of the reasons Gatsby is so cool is that it seamlessly integrates GraphQL in its data layer. GraphQL was fairly easy for me to learn, perhaps because I'm so new to the game that I'm not stuck in other ways.

Following along with more tutorials and reading the Gatsby docs, I figured out how to write queries for fetching my content from Contentful. It made it super easy.

For example, the query I wrote in my `BlogPost.js` template looks like this:

```javascript
export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      slug
      tags
      title
      subtitle
      published(formatString: "MMMM Do, YYYY")
      heroImage {
        id
        title
        description
        file {
          url
        }
      }
      bodyContent {
        childMarkdownRemark {
          html
        }
      }
      author {
        id
        name
        email
        birthday
        twitterURL
        instagramURL
        githubURL
        avatar {
          file {
            url
          }
        }
        biography {
          biography
        }
      }
    }
  }
`;
```

When I receive the customized object from the query, I basically just stick the content in all of the appropriate places. It's really easy to be honest. Gatsby makes GraphQL wildly effortless.

## Final Thoughts on Gatsby

Gatsby is amazing. I've grown a lot as a React developer by using Gatsby. It's taught me a lot from developing in React and using GraphQL to other soft skills such as reading docs, working with file systems, using the CLI, and how to work quickly.

I definitely plan on using Gatsby in the future, especially on client projects when it's most beneficial. Gatsby is a fantastic tool and makes it easy to integrate tools like Contentful.

On my next blog post, I will be sharing my time working with Contentful and how I integrated it with Gatsby and why I it became my first choice CMS for my blog! So stay tuned.

Thanks for reading!
