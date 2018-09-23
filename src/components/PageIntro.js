import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import aboutImg from '../images/cave.jpg';
import contactImg from '../images/yellow-telephone.jpg';
import img from '../images/icons/angle-arrow-down.svg';

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 650px;
  width: 100%;
  background-image: url(${props => props.about ? aboutImg : contactImg });
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
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
`

const DownArrow = styled.img`
  height: 33px;
  width: auto;
  fill: #000;
  padding-bottom: 11px;
`;

class PageIntro extends React.Component {
  render() {
    return (
      <Header about={this.props.aboutPage}>
        <BlackLayer>

          <Navbar action={this.props.action} />

          <Headline>{this.props.headline}</Headline>
          <DownArrow src={img} alt="down arrow icon" />
        </BlackLayer>
      </Header>
    );
  }
}

export default PageIntro;
