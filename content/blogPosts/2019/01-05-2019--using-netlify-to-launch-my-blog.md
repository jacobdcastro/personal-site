---
slug: "using-netlify-to-launch-my-blog"
title: "Using Netlify to Launch My Blog"
subtitle: "I found the best tool of 2018, hands down."
image: "jason-leung-479251-unsplash.jpg"
imageTitle: "Confetti Falling"
imageAlt: "Colorful confetti falling with bright background"
date: "2019-01-05T00:00:00-07:00"
tags:
  - "deployment"
  - "netlify"
  - "website"
type: "blogPost"
---

This year, there were a few breakout technologies that shook up the web development world a little bit. One of which was Gatsby.js. I wrote a blog post about my (incredible) experience using it on this blog. Check it out here!

Another breakout technology company was none other than Netlify. I read a [tweet](https://twitter.com/chancethedev/status/1069992618543775747 "Netlify Tweet") today by @chancethedev that read "What is your favorite dev tool in 2018 and why is it @Netlify?"

To be honest, that couldn't be truer. As a new developer of less than two years, Netlify improved my development experience ten fold. Simply using it helped me to understand how websites are built and pushed live to the web. And I found it on a little podcast called Syntax, hosted by Scott Tolinski and Wes Bos. I guess sponsorships do work. Especially when you make a killer product/service like Netlify.

## What is Netlify?

Netlify is a web host. It makes it super easy to put a website live on the web. Plus there's free SSH certificates with every website with **literally** a click of a button. I'm not even kidding. As a newer dev, I've never had to configure one for a website manually but I've heard it's a pain and a half. I just kind of... click a few buttons on the Netlify web app and my website it secure.

So yes, Netlify is a web host. But they're a very unique one. Netlify is directly connect to your website's git repository and automatically runs the build command each time a new commit is pushed to a particular branch.

For example: this website is open-source on Github. Netlify is connected to my repo at `jacobdcastro/personal-site`. Once I connected the two, I selected one branch in my repo to be the one that gets placed live at my domain `https://jacobdcastro.com/`. That means every time I make a change to my website (say, I fix a minor CSS bug) and push it to my master branch, Netlify sees that there was a change, and automatically runs a new build and pushes THAT updated website live. It's so perfect because whatever consists of my master branch is what's live. It will always match what's on my `master`.

Netlify also randomly generates test domains for other branches in your repo. In my Github repo, I have three branches currently: `master`, `development`, and `to-gatsby`. My master branch is made live at https://jacobdcastro.com/. That's easy. As for my other two branches, they each have a randomly generated subdomain that is ALSO live on the www. So I can still view and test my development branch live on the internet without a local development server. But no one will find that domain because it's literally a randomly generated ID. It's super cool!

## Building My Site with Contentful

Another cool feature of Netlify is the webhooks. I've already mentioned it in my Contentful blog post but I just need to mention it real quick. This is sick.

When setting up Netlify with my Gatsby site, you give Netlify the build command so that when it needs to update the site, it runs the specific build command. For Gatsby, the build command is `gatsby build`. So Netlify runs that every time you push a new commit. Netlify will also run that everytime I update anything on Contentful. This magic is thanks to webhooks. When I push the 'publish' button on Contentful, it will send a signal (or webhook) to Netlify saying, "hey, Jacob updated something. Build the site again!" And... it does it. It's amazing.

## Netlify Final Thoughts

I'm in love with Netlify to be honest. I rock a sticker on my laptop and I'm never looking back.

There's so many other aspects of Netlify that make it so much more than just a web host, even though that's just what I use it for. They have server-side functions, contact forms, identity management, and much more. It's an amazing development tool. So what do I think of Netlify? I'll leave you with this:

Netlify helped me worry less about the under-the-hood aspects of building a live website and focus more on learning to code and honing my craft. And for that, I will recommend Netlify any day of the week. Especially for junior devs and students who just wanna make something simple and slap it on the world wide web.

Go check Netlify out, seriously!
