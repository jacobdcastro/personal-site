import React from 'react';
import { Link } from 'gatsby';
import Layout from '../templates/layout';
import { Container } from '../styles/AboutStyles';
import './normalize.css';

class About extends React.Component {
  render() {
    return (
      <Layout
        pageTitle="About Me - "
        headline="Who am I?"
        className="aboutPage"
        backgroundIsBlack={false}
      >
        <Container>
          <div className="aboutSection">
            <h2>About Me</h2>
            <p>
              My name is Jacob Daniel Castro. I am a front-end web developer. I
              love to code websites and stuff like that.
              <br />I started learning to code HTML and CSS in 2015 after I
              graduated high school. I was a little on-and-off with my learning
              up until the end of 2017 where I decided that web development was,
              indeed, the career I wanted to pursue. From there, I jumped into
              JavaScript and have been falling more and more in love with web
              development ever since.
            </p>
            <p>
              After coding, I also really enjoy design. My favorite sans-serif
              fonts are
              <a href="https://www.myfonts.com/fonts/linotype/helvetica/">
                Helvetica
              </a>
              and
              <a href="https://fonts.google.com/specimen/Montserrat">
                Montserrat
              </a>
              . I don't really have a favorite serif font (yet), but they're
              cool too, I guess.
            </p>
            <p>
              One of my favorite things to do is take my passion for design and
              love for coding and combine them in my projects. I'm obssessed
              with gorgeous UI's; designing my own (for clients or otherwise) is
              so satisfying. And then translating that into code and crafting a
              truly memorable UX is my passion.
            </p>
            <p>
              I live in Santa Maria, CA but my goal is to move to Chicago, IL
              someday soon. Some would say that's a downgrade, at least in
              weather quality, but I'm focused as hell to get there. If you're
              from Chicago, I'd love to{' '}
              <Link to="/contact/">hear from you</Link>!
            </p>
            <p>
              Some hobbies of mine include music and sports. I play guitar and
              sing a bit. I also really really love sports. All Chicago-based
              teams are my favorite (except the White Sox, of course).
            </p>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default About;
