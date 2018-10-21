import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const CardContainer = styled.div`
	height: 250px;
	width: 200px;
	margin: 0;
	padding: 12px;
	background-color: #eee;
	box-shadow: 0 5px 17px #676767;
	transition: 0.5s;
	&:hover {
		cursor: pointer;
		transform: scale(1.05, 1.05);
	}
`;

const BlogTitle = styled.h1`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
`;

const BlogSubtitle = styled.h3`
	font-family: 'Montserray', 'Helvetica', sans-serif;
`;

class BlogPostCard extends React.Component {
	render() {
		return (
			<CardContainer>
				<BlogTitle>{this.props.postData.title}</BlogTitle>
				<BlogSubtitle>{this.props.postData.subtitle}</BlogSubtitle>
				<h4>{this.props.postData.author.firstName}</h4>
			</CardContainer>
		);
	}
}

export default BlogPostCard;
