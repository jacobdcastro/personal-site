import React from 'react';
import { Link } from 'gatsby';
import './normalize.css';
import Layout from '../templates/layout';
import styled from 'styled-components';

const Body = styled.div`
  padding: 15px;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutSection = styled.div`
  max-width: 1025px;
`;

const AboutHeadline = styled.h2`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  text-align: center;
  letter-spacing: 1px;
  color: #353535;
    @media (min-width: 820px) {
      font-size: 2em;
    }
`;

const AboutContent = styled.p`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  margin: 14px auto;
  max-width: 1125px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 27px;
  color: #353535;

  @media (min-width: 820px) {
    width: 80%;
    font-size: 1.1em;
  }
`;

const MiscLinks = styled.a`
  text-decoration: underline;
  color: inherit;
`;

const linkStyles = {
	color: 'black'
};

class About extends React.Component {

  // RUNNING LIST OF PROPS => LAYOUT.JS
  // pageTitle, headline, aboutPage, backgroundIsBlack

	render() {
		return (
        <Layout
          pageTitle="About Me - "
          headline="Who am I?"
          aboutPage={true}
          backgroundIsBlack={false}
        >
					<Body>
						<AboutSection>
							<AboutHeadline>About Me</AboutHeadline>
							<AboutContent>
                My name is Jacob Daniel Castro. I am a front-end web developer. I love to code websites and stuff like that.<br />
                I started learning to code HTML and CSS in 2015 after I graduated high school. I was a little on-and-off with my learning up until the end of 2017 where I decided that web development was, indeed, the career I wanted to pursue. From there, I jumped into JavaScript and have been falling more and more in love with web development ever since.
							</AboutContent>
							<AboutContent>
                After coding, I also really enjoy design. My favorite sans-serif fonts are <MiscLinks href="https://www.myfonts.com/fonts/linotype/helvetica/">Helvetica</MiscLinks> and <MiscLinks href="https://fonts.google.com/specimen/Montserrat">Montserrat</MiscLinks>. I don't really have a favorite serif font (yet), but they're cool too, I guess.
							</AboutContent>
							<AboutContent>
                One of my favorite things to do is take my passion for design and love for coding and combine them in my projects. I'm obssessed with gorgeous UI's; designing my own (for clients or otherwise) is so satisfying. And then translating that into code and crafting a truly memorable UX is my passion.
							</AboutContent>
							<AboutContent>
                I live in Santa Maria, CA but my goal is to move to Chicago, IL someday soon. Some would say that's a downgrade, at least in weather quality, but I'm focused as hell to get there. If you're from Chicago, I'd love to <Link to="/contact/" style={linkStyles} >hear from you</Link>!
							</AboutContent>
							<AboutContent>
                Some hobbies of mine include music and sports. I play guitar and sing a bit. I also really really love sports. All Chicago-based teams are my favorite (except the White Sox, of course).
							</AboutContent>
						</AboutSection>
					</Body>
      </Layout>
		);
	}
}

export default About;
