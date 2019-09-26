---
slug: "this-is-2-0"
title: "This is 2.0"
subtitle: "My new website is finally live and I couldn't be more excited."
image: "new-website-meta-img.jpg"
imageTitle: "Jacob D. Castro Website Intro"
imageAlt: "JDCastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username"
date: "2019-09-23T00:00:00-07:00"
tags:
  - "gatsby"
  - "react"
  - "ui"
  - "design"
type: "blogPost"
---

## Website Refresh

In [my last blog post](https://jacobdcastro.com/blog/time-to-change-up-my-blog), I shared about my decision to redesign and restructure my website! This redesign was not only from a UI standpoint, but also in regards to code readability and repository weight-loss.

[My repo](https://github.com/jacobdcastro) lost a ton of weight.

## Recap

I wrote 1.0 as a very beginner. It was one of the first websites I ever built. It was originally written with vanilla HTML, CSS, and JS files. Super basic.

I then learned React, and refactored my site using create-react-app. That was actually a ton of fun. But as you can imagine, as someone who just learned React, there were plenty of bad practices.

Soon, I decided to do it all with Gatsby, wich was even more fun. But I just carred the bad practices over from before.

Still using Gatsby, my 2.0 site is so much lighter and better suitable for it's uses.

## Developer minimalism

Originally, the CMS I was using for blog posts was [Contentful](https://contentful.com). It was incredible; I'd recommend Contentful to anyone. But for a fairly basic blog like mine, it was an overkill.

I got rid of all Contentful integrations and I now use markdown for my blog posts! It's so much nicer to keep my blog posts all in one place instead of relying on someone else's CDN to deliver my blog posts at build time.

All my blog posts (and more) now live in the "content" folder at the root of the project. And after a bit of playing around with the file structure within the "content" folder, I finally figured out a decent way of storing posts.

So. Much. Nicer.

## Personalized CMS's are fun!

It took me a while to establish a good way to store blog post meta data. In Contentful, I just added new fields with meta data, and Contentful even tracked a lot of stuff for me, such as the timestamp at the time of publishing.

But I figured out a great way that's standardized for both blog posts and tutorials. It utilizes frontmatter at the top of markdown files and, for the new CMS, looks like this:

```yaml
---
slug: "this-is-2-0"
title: "This is 2.0"
subtitle: "My new website is finally live and I couldn't be more excited."
image: "new-website-meta-img.jpg"
imageTitle: "Jacob D. Castro Website Intro"
imageAlt: "JDCastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username"
date: "2019-09-23T00:00:00-07:00"
tags:
  - "gatsby"
  - "react"
  - "ui"
  - "design"
type: "blogPost"
---

```

This is the actual meta data for this blog post. This meta data API is explained further in the [README](https://github.com/jacobdcastro/personal-site/blob/master/README.md) of this project.

## Styles

The new internal CMS is the biggest codebase change, no doubt. But next refreshing change to the codebase involved the styles.

From the first create-react-app version, I've used [styled-components](https://styled-components.com) for CSS-in-JS. Originally, my component file looked something like this:

```javascript
import React from "react";
import styled from "styled-compnoents";

const MyComponentStyles = styled.div`
  /* TONS OF DAMN STYLES */
  /* ..... */
  /* ..... */
  /* ..... */
  /* Media queries and such */
  /* ..... */
  /* ..... */
  /* ..... */
  /* Okay finally done */
`;

const MyComponent = () => (
  <MyComponentStyles>
    <h1>Hello, World!</h1>
  </MyComponentStyles>
);

export default MyComponent;
```

Opening a file to simply edit some JSX presented a 5-second-plus-long scroll party to get past lines of CSS. It was annoying, but I did it to myself.

Now there's a dedicated styles folder that somewhat mirrors the structure of the components folder. The styled component code is exported from the styles folder, and imported into components folder to associated components.

Clean, clean, clean.

## Theme button!

This feature became a bit of an addiction.

There's now a dark and light theme to my website. So if you're reading this post in bed at 11:00pm, you're hopefully not blinding yourself or hurting your circadian rhythm by using the light theme.

I conveniently placed the theme button at the bottom right corner of the window, where it's easy to access.

Currently resisting the urge to toggle the theme all day.

## Fun animations

The last nice change is adding more animations and better functionality to the mobile navigation. The hambuger menu does a fun little spinny thing now, the mobile nav feels far less invasive, and the art of the 'z-index' was perfected just a little more.

There's also nice hover animations over the blog post listings and social media icons on the home page.

## Visual Minimalism, too

I'm a huge fan of minimalist design. I love grayscale and black-and-white color palettes. [Montserrat](https://fonts.google.com/specimen/Montserrat) is my favorite font and I'm obssessed with the feeling negative space gives to my eyes.

Have you seen the [home page](https://jacobdcastro.com) yet?

Make sense now?

## Coming Soon

I have lots of other feature ideas for this website. Maybe a small learning platform? Discover new music? Who knows. All I know is I'm hyped to add some more stuff to this project.

Feel free to check out the [Github repo](https://github.com/jacobdcastro/personal-site/) and let me know what you think! Tweet me [@jacobdcastro](https://twitter.com/jacobdcastro).

More posts coming soon...

Much love,
