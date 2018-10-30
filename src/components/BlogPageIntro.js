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
  height: 414px;
  width: 100%;
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;

  @media (min-width: 820px) {
    height: 500px;
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

const TitleContainer = styled.div`
	text-align: center;
	margin: 5px 14rem;
	width: 90%;
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

class BlogPageIntro extends React.Component {
	render() {
		return (
			<Header bgImg={this.props.bgImg}>
				<BlackLayer>
					<Navbar action={this.props.action} />

					<TitleContainer>
						<Headline>{this.props.headline}</Headline>
					</TitleContainer>

					<DownArrow src={img} alt="down arrow icon" />
				</BlackLayer>
			</Header>
		);
	}
}

export default BlogPageIntro;
