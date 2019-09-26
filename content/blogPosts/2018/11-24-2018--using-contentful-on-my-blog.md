---
type: "blogPost"
slug: "using-contentful-on-my-blog"
title: "Using Contentful On My Blog"
subtitle: "My blog is headless and it's incredible"
image: "rawpixel-567018-unsplash.jpg"
imageTitle: "Typewriter"
imageAlt: "Hands typing on typewriter"
date: "2018-11-24T00:00:00-07:00"
tags:
  - "cms"
  - "content"
  - "contentful"
---

Headless content management systems have become a thing in the web development world. They make it fast and easy to pull data and content from other places to throw on your site. There's a handful of different ones out there that people love.

One of the first ones I was considering using for this blog was GraphCMS, a GraphQL-based content management system. I'm not going to lie, I love the UI they have; it's so well-designed and intuitive. But I continued to explore my options.

I checked out another system made my Netlify. It's literally called Netlify CMS. I didn't spend as much time researching this one as I did GraphCMS and Contentful, but I simply decided not to choose it. Even though I've only heard amazing things about it, Netlify CMS didn't become my final solution. Contentful did.

## Getting to Know Contentful

Contentful simply looked amazing. Their UI looked simple and easy-to-use, the way their "spaces" and "content model" worked really made sense to me at first. Clicking around the admin pages made me excited to use a tool that was so flexible and straight forward.

While looking for my CMS of choice, there was one question I had in the back of my mind: **would I feel confident using this CMS on a client project?**

The answer to Netlify CMS was "probably."
For GraphCMS, "sure."
But for Contentful, my answer was, with no doubt, "absolutely."

Contentful seemed so much more able to handle a large-scale project. There's also features to add user profiles with separate permissions per account. It can be a truly team experience when working with multiple developers and content creators.

I also enjoyed reading through the Contentful docs. It was very easy to get to know and there were plenty of resources to learn Contentful such as Youtube videos and blog articles.

## Using React

Using GraphQL in my Gatsby blog was extremely easy to do. GraphiQL made it even easier to find my content.

GraphQL seemed too good to be true. But once copying and pasting my query in my code, placing the content from the returned JSON data into my JSX, and seeing it pop up in the browser, I was hooked on this system. Gatsby and Contentful were made for each other, I swear.

This is what my query looks like on my `BlogPost.js` page template:

<!-- TODO Rewrite code chunk with Prism.js -->

![BlogPost-query](//images.ctfassets.net/oghc6wtiomc3/5UQK82AswwskoSWgSG6kai/0a450eaa92ec8f230f96d9ac03a0ba0f/BlogPost-query.png)

<!-- TODO ================================ -->

Once the content is called via GraphQL, I pretty much just slap the content into the markup. Fairly simple honestly! This is what my `render()` method looks like with the injected Contentful content:

<!-- TODO Rewrite code chunk with Prism.js -->

![render-method](//images.ctfassets.net/oghc6wtiomc3/2EF4t0NPbWgYoWsYqmUIki/3452cacb9733bce07977e2d806e9f647/render-method.png)

<!-- TODO ================================ -->

It's pretty straight forward to fetch the content and place it appropriately in the site, which I am passing the data as props to all of my main components on the `BlogPost.js` template.

## 3 Favorite Things About Contentful

After getting to know the Contentful system more and integrating it into my site, there were a few specific features that really stuck out to me. They were major contributors in my ultimate decision to choose Contentful over other ones. Here are my three favorite features in Contentful:

### 1. Markdown Long Text Editor

When creating a content type in the content model, there are two primary entry types for text: short text and long text. Short text is literally just a string that is shorter than 256 characters unless otherwise specified. But the long text entry type is much more robust. This is because it uses markdown (.md files) to write long copy, such as the body content of a blog post. This is what the markdown long text editor looks like:

<!-- TODO Rewrite code chunk with Prism.js -->

![contentful-md-editor](//images.ctfassets.net/oghc6wtiomc3/eNNUKFEUaAoEsyqc6aKIQ/2f4a55c817c255652612ad26bb16264c/contentful-md-editor.PNG)

<!-- TODO ================================ -->

When the body content of my blog is fetched, it returns raw, minified markdown. This would be useless if it wasn't for Gatsby's plugin called gatsby-transformer-remark. This is a transformer plugin that literally transforms markdown files into HTML. It creates a query in the schema called `childMarkdownRemark` that I use access the body content of my blog post. The query looks like this:

```
bodyContent {
     childMarkdownRemark {
         html
         excerpt
     }
}
```

As you can see, not only can `childMarkdownRemark` return the HTML, it can also create a snippet of 50 words or less to place as a preview, as noted by the `excerpt` query. Overall, I love the way Contentful uses markdown and how Gatsby can transform it into usable markup. It's perfect.

### 2. Roles and Permissions

I have yet to really put this to good use. But with clients, this feature is a dream. There's no need to create shared login information. Both I, the developer, and my client, the content creator, can work on things equally without stepping on each other's toes in the project.

Not to mention, when content is edited and published, it labels who the author was, when it was created, edited, and published. Permissions are also easily editable to restrict or free various rights to certain accounts and editors. This holds people accountable so not everyone contributing to a project can have access to everything. That is so important when working with clients.

### 3. Webhooks

One of my favorite things in all of web development is automation. Contentful does automation extremely well with third-party services with webhooks. The only ones I'm currently using are the Netlify and Slack webhooks.

The Netlify webhook automatically triggers a build process (more on Netlify in the next blog post) every time a new entry is published, edited, deleted, etc. This is super nice for a blog like this one because when I delete, unpublish, or add a new blog post, it automatically builds my site including that update. I never have to do anything manually. It's beautiful, really.

Similarly, the Slack webhook notifies my Slack channel whenever there's an edit to the content. It's so nice to have a stream of notifications handy rather than digging through Netlify or Contentful menus to find when, what, or where something was edited. It makes it super convenient!

## Final Thoughts on Contentful

I've loved my experience using Contentful. Even without Gatsby, it would be a delight to use for any website's content infrastructure. But when paired with Gatsby, Contentful is a breeze to use and every little aspect of the two technologies seem to be made for each other.

I have no plans on switching to another CMS any time soon; Contentful is just too good. But, of course, I'd be happy to learn a new CMS just to have options. But since I have a good feel for Contentful, I could probably pick up any other CMS pretty easily. Contentful has been a great start to my career in working with API's.

Thanks for reading, and let me know if you check out Contentful or use it in your own site! I'd love to hear more about how you make it work for you.

Thanks for reading!
