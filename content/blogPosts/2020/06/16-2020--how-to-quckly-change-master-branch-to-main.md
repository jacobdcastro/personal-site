---
slug: "how-to-quickly-change-name-of-master-branch"
title: 'How to Quickly Change the Name of "Master" Branch'
subtitle: "Eliminating racism in tech starts with recognizing racist roots, and fixing them."
image: "zach-reiner-H7LxvEmVZnE-unsplash.jpg"
imageTitle: "Github Branch Renaming"
imageAlt: "a bare tree branch on a beach"
date: "2020-06-16T00:00:00-07:00"
tags:
  - "git"
  - "command line"
type: "blogPost"
---

There is no place for racism and racial inequality in tech. Unfortunately, racism still runs deep in the roots of the tech industry in both subtle, and not-so-subtle ways. I hate racism and everything supporting it.

One way we can take steps toward a more equal future is addressing the issue of the "master" branch. Bringing recognition to the origin of the name is step one. Step two is doing something about it.

## Origin

If you're active on Twitter, you may have heard a thing or two about the "master vs. main" debate. In my opinion, there is no debate. Changing the default branch from "master" is the right thing to do.

In computing, the original terminology for git branches was derived from slavery. Yes, as in one group of people enslaving another on the basis of race, nationality, or politics. The default branch was the "master" that all other "slave" branches reported to, copied from, merged into, etc.

Obviously, not every developer is aware of it's origins, and by no means is every developer racist. Of course not. But the truth is, by allowing the "master" naming scheme to remain the standard, we are only upholding racist ideologies in our industry. And that is wrong. It always has been, and always will be.

Step  one, bring recognition.

Step two, do something about it.

## Renaming the `master` Branch

Changing the name of the `master` branch is very simple. You may choose to rename it to whatever you'd like! The most popular names are `main` and `default`. For this example, we'll be using `main` but feel free to change it to something clear, obvious, neutral, and **not racist**.

### 1. Change Branch Name Locally

In your terminal, change to the project directory you wish to rename and run this command:

```bash
$ git branch -m master main
```

This only changes the branch name on your local machine.

### 2. Push the Change to Remote origin

Now we need to let Github (or GitLab or BitBucket) know about this change:

```bash
$ git push -u origin main
```

This command will create the `main` branch remotely, but will not delete the `master` branch. Now, both `main` and `master` branches exist.

### 3. Change Default Branch in Repo Settings

In your repository's settings, there will be an option to change the default branch.

On Github: settings > branches > set default branch (to main)

![Screenshot of changing default branch in Github settings](https://jacobdcastro.com/content/images/master-branch/github-change-branch.png "Github Default Branch Settings")

On another git repository hosting platform such as GitLab or BitBucket, this may be different. Take a look in the settings, it will be there somewhere.

### 4. Delete the Master branch

From your repository's home page, click the 'branches' link (button next to total number of commits). It will take you to a page listing all of your project's branches. Click the little trash icon to delete the master branch. And boom, no more master in your repository!

![Screenshot of deleting master branch on Github](https://jacobdcastro.com/content/images/master-branch/github-delete-branch.png "Github Delete Branches")

### 5. Double Check Hosting Settings

Depending on which web hosting platform you use, you may need to change settings to point the listener to `main` instead of `master`. Most CI/CD applications always listen on the default branch, so completing step 3 will have done the job. But some may require a specific settings change, so it's good to double check your hosting or CI/CD platform for branch name compatibility!

## Moving Forward

In tech, we are all about improvement. Making a program faster, having better SEO, using the next best stack, and more. Right now, improvement looks like eliminating racism in all forms, subtle or not-so-subtle.

This is not a step back, nor is it just people being oversensitive. **Changing the branch name away from `master` is improvement.** I hope this helps understand the "why" and "how" of changing your branch name.

Thank you so much for reading. Remember, Black Lives Matter.
