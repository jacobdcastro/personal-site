import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import aboutImg from '../images/cave.jpg';
import contactImg from '../images/yellow-telephone.jpg';
import blogImg from '../images/laptop-desk.jpg';
import downArrowImg from '../images/icons/angle-arrow-down.svg';

const HeaderContainer = styled.div`
  margin: 0;
  padding: 0;
  .aboutPage {
    background-image: url(${aboutImg});
    background-position: center;
  }
  .contactPage {
    background-image: url(${contactImg});
    background-position: center;
  }
  .blogPage {
    background-image: url(${blogImg});
    background-position: right;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 500px;
  width: 100%;
  background-size: cover;
  margin: 0;
  padding: 0;

  @media (min-width: 820px) {
    height: 650px;
  }
`;

const BlackLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Headline = styled.h1`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;

  @media (min-width: 820px) {
    font-size: 2.55em;
    letter-spacing: 9px;
  }

  @media (min-width: 1080px) {
    font-size: 3.15em;
    letter-spacing: 12px;
  }
`;

const DownArrow = styled.img`
  height: 33px;
  width: auto;
  fill: #000;
  padding-bottom: 11px;

  @media (min-width: 820px) {
    height: 42px;
  }
`;

class PageIntro extends React.Component {
	render() {
		return (
      <HeaderContainer>
        <Header className={this.props.className}>
          <BlackLayer>
            <Navbar action={this.props.action} />
            <Headline>{this.props.headline}</Headline>
            <DownArrow src={downArrowImg} alt="down arrow icon" />
          </BlackLayer>
        </Header>
      </HeaderContainer>
		);
	}
}

export default PageIntro;
