---
slug: "time-to-change-up-my-blog"
title: "Time to Change Up My Blog"
subtitle: "The first stack was great to learn, but I've realized something."
image: "kaleidico-26MJGnCM0Wc-unsplash.jpg"
imageTitle: "Whiteboard"
imageAlt: "Two designers writing on whiteboard. Photo by Kaleidico on Unsplash"
date: "2019-08-14T00:00:00-07:00"
tags:
  - "gatsby"
  - "react"
  - "ui"
  - "design"
type: "blogPost"
---

## Small Sites Don't Need Much

When I first made my website, I was hearing a lot about various headless content management systems (CMS's) such as [Netlify CMS](https://www.netlifycms.org/ "Netlify CMS"), [GraphCMS](https://graphcms.com/ "Graph CMS"), and even headless Wordpress. The CMS I ended up choosing was [Contenful](https://contentful.com "Contentful").

I actually really love Contentful to this day. It's extremely versatile, reliable, and easy to use. I couldn't recommend it more for large projects. In fact, a few of my clients decided on Contentful for their CMS. It's not hard to sell a good product.\

Once again, I couldn't recommend it more for large projects. But for my little website? It was a bit of an overkill...

Okay, it's a **massive** overkill.

And my one _small_ complaint is just that I don't really enjoy writing blog posts in the Contentful. It's not even that bad, I just enjoy typing in my text editor too much!

## The New CMS

Instead of forcing my small content into a large data infrastructure, I'm just bringing all of my current content into the repository. This is for a few reasons...

### 1. I love typing in VS Code

Not only do I really enjoy reading and writing in a monospaced typeface, but I really love the VS Code theme I made. Kinda funny how much of a difference that makes... My favorite color is purple. And my favorite text theme is Atom's One Dark. So this is my text editor!![vscode-theme](//images.ctfassets.net/oghc6wtiomc3/1BTY4katPXH7gNt0LyyRhK/9f137f410809b25fefec47f8f6c604fd/vscode-theme.PNG)

### 2. I want to open source my content.

Other people are often better at catching bugs in your code than you are. I write a typo every now and then and I usually don't catch it until a week later when I randomly decide to read my post again.

Plus, I'd love for anyone who has ideas and would like to contribute, to do so. If my blog grows, it would also be cool to feature guest writers via pull requests.

So if _you_ have an idea or blog post, shoot me an email (jdcastro.business@gmail.com) or just check out the [repo](https://github.com/jacobdcastro/personal-site "Website Github Repository").

### 3. MDX is really cool.

I mean yeah, that's basically it on that one. Contentful just uses standard markdown but MDX is much more powerful and just fun to play with. So MDX it is!

### 4. I'm setting up the future of my website.

I'm about to give you a sneak peek. And this is a little tied to number 2...

In the future, I plan on publishing tutorials and creating content for people to learn web development. Just tutorials around getting started with the basics like HTML5 and CSS3, and Javascript and/or React basics.

I'd just like to solidify my knowledge further by teaching others. I few different ideas of how I'd do it, but that'll be for another day.

Along with tutorials, I have a few other ideas for expanding my website and adding features just for fun. And the idea of a monorepo for all of that is really attractive to me. There are a ton of different opinions on monorepo architecture (think [Gatsby's monorepo](https://github.com/gatsbyjs/gatsby "Gatsby's Monorepo")), but the model just makes sense to me mentally.

In a nutshell, monorepos just have all of their content in their codebase. There's no external database or third-party CMS, all of it is internal. And with my website built with Gatsby, it makes for a perfect use-case for monorepo architecture since the sites files are statically served.

## Website 2.0 in the Works

With all of that said, I'm now undergoing a complete redesign and restructuring of my website!

### UI Redesign

The UI will change to be even more minimal than it already is. It's more visually pleasing to me and easier to use and navigate. It will also feel less "Wordpress theme-y", which is the vibe I continue to get from my current 1.0 design. This next UI design will feel a lot more like "me".

### Filesystem restructure

The filesystem will now hold all (or most) of my site's blog posts. And once I start adding new content types such as tutorials and other ideas I have, they will also live on Github. And with that, it'll continue to be open-source!

### Update Everyting

My site is finally using React v16.9.0. Which means I can throw out all of those classes and start using arrow function components with HOOKS. I've actually been having so much fun with hooks. the more I used them, the more I got jealous for my website being without them.

Plus Gatsby is being updated to v2.13.0 so that's always fun. I can finally integrate useStaticQuery() which is so helpful.

## Refactor Party

Out with the old, in with the new. I'm ditching Contentful for my own methods of managing content. And now that I have much more experience as a web developer, I'm noticing what I need, what I don't need, and how to do things on my own rather than rely on too many tools.

It's so cool to observe my own progress. Now time to enjoy the adventure of personal-site 2.0.

If you'd like to follow my progress, stay tuned to this blog! I'll share new posts on my social media. You can follow me anywhere at @jacobdcastro. Or click the icons below for your preferred social network.

Please check out the [Github repo](https://github.com/jacobdcastro/personal-site "Website Repository") too! I'm super open to feedback and pull requests are always welcome!

Thanks so much for reading this update! I'm excited to start writing and posting more here. See you soon for another progress update on 2.0!

Much love.
