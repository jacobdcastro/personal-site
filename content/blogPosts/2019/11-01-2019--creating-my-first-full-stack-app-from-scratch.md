---
slug: "creating-my-first-full-stack-app-from-scratch-part-1"
title: "Creating My First Full Stack App From Scratch (Part 1)"
subtitle: "Moving from primarily-frontend to building an API alongside a single-page React app opened up my world."
image: "gamenightscore-screenshot.png"
imageTitle: "GamenightScore Lobby"
imageAlt: "screenshot of gamenightscore app with player's scores"
date: "2019-11-09T00:00:00-07:00"
tags:
  - "react"
  - "nodejs"
  - "express"
  - "mongodb"
  - "fullstack"
  - "mern"
type: "blogPost"
---

Early on in my web development journey, I decided I wanted to get into full-stack development. I didn't really know any ways of practicing full-stack development though. It's easy to replicate a static site and practice frontend dev. But as soon as I felt ready to start learning backend, I felt a little lost on where to begin.So I pretty much stuck to frontend dev with a very (very) basic understanding of Nodejs/Express thanks to some Treehouse courses.

But earlier this summer, I decided to dive into a MERN stack course on [Udemy](https://udemy.com/). It covered building a [Node](https://nodejs.org/) server with [Express](https://expressjs.com/), connecting it to [MongoDB](https://www.mongodb.com/) through [Mongoose](https://mongoosejs.com/), and developing a [React](https://reactjs.org/) frontend using [Redux](https://react-redux.js.org/) to manage the app's state. It was the full deal.

And let me tell you, I had so much fun! Just to build a server that was intended to be used by an actual client, one I would end up developing as well, lead me to have the most fun coding I'd have in a long time.

It wasn't that I didn't love frontend anymore. Nor was it that I enjoyed backend _more_ than frontend... I found that I enjoyed _all_ of web development significantly more now that I had an understanding of server-side code.

For the record, I did seriously love developing a server with Nodejs/Express. And I enjoy React now more than ever thanks to simple experience and learning better practices.

## Birth of the Idea

After getting through most of the MERN stack course I finally decided to start developing a project idea I thought of earlier this year. The idea was not only well within reach for accomplishment (or so I thought), but also was a real itch-scratcher for an actual problem I was having. The app would be used to keep score for the card game called Dutch Blitz, which my friends and I play a lot.

### The problem

Dutch Blitz is a card game that is not turn-based. On 'go', everyone begins playing cards in the center of the table and the first to get rid of their stack of cards wins. Everyone's final scores are the sum of a positive and negative number. So some rounds you end above zero, and other worse rounds you may end with a negative score. So math is involved to get your round score.

The fun part about this game is your score accumulates and adds to your previous rounds' scores. So if in your first three rounds, your scores were 15, -7, and 4, your total score is 12. After 10+ rounds, mental math gets tiring and having one person trying to take and add everyone's score is slow and repetitive.

### The Solution

So I wanted to make a scorekeeper web app where everyone on their own devices can join a live game server and enter their scores in the app. Then the app would update on everyone else's devices to show each player's score as they were being submitted. It would also be fun to see other game stats that normally wouldn't be tracked because it's too much manual effort on a piece of paper.

I shall call it **GamenightScore**. Literally why not. Better than "dUtCh bLiTz sCoReKeEpEr aPp".

## Starting Backend Development

I would follow a very similar model to that of the course I took on Udemy. To no one's surprise, this web app will also be a MERN app!

So I installed all of the initial NPM packages I knew I'd needed to build the server and, after a bit of basic app planning, got to work!

I began creating the document models for MongoDB and the structure for which the game data would be stored. It included the main 'Game' document, with 'Player' and 'Round' subdocuments. Those had basic game data such the game title and password, the arrays of rounds and players, player data like name and round scores, and lots more (details to this will be covered in-depth in a future blog post).

I knew I'd probably be adding more data as I began to develop this app, but once the models were at a good starting point, I began writing all the API endpoints for functions I knew the app would need. Such as creating a game, joining a game, starting a new round, submitting a player's score, etc.

I was so hopeful, excited, and ready to step foot into some new concepts!

At least at first.

## Facing Giants

Pretty much immediately, I began to grow more and more intimidated. Through some development of a few endpoints, I realized I may have bit off more than I can chew with this project. I was testing the API with [Postman](https://www.getpostman.com/) and pretending to go through playing a game through the Postman UI. But so many problems were being exposed!

I know that's a good thing. But at first, I was so overwhelmed. I realized I had to rearrange some of the models' data structures which took some playing around with, I had to add more endpoints to handle other functions I hadn't thought about, and I just had to rethink the entire round-to-round lifecycle that would keep the app going through a game of Dutch Blitz.

Despite feeling absolutely overwhelmed by all of these unexpected issues, I was having weird feelings... Conflicting feelings... One could describe them as.... Exhilirating. Adrenaline-inducing. Possibly even... **Fun**.

I honestly enjoyed every second of the setbacks. I was determined beyond explanation. I did what I had to do. I soon saw broken lines of code finally work, and MongoDB was being populated with proper data! It was finally working out well, even though I had to rewrite a lot of code.

By far the biggest obstacle was trying to clean up a lack of planning the server. I wouldn't have even known how to "plan" the development of this server before just... doing it. But I got over it. And it was finally time to whip up the frontend!

Feel free to check out the live project at this [randomly generated Heroku URL](https://howling-nightmare-39429.herokuapp.com/) or peek into the [repo on Github](https://github.com/jacobdcastro/gamenightscore)!

In the next blog post, I'll tell my story of developing the React app and some of the hardships I faced there. Follow me on Twitter ([@jacobdcastro](https://twitter.com/jacobdcastro/)) and look out for the announcement of the next blog posts! In the next two parts to this, I'll be talking about my journey on the frontend, and then a more in-depth look into the code base and how the app works technically.

Thanks for reading!!!
