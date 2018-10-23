import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const CardContainer = styled.div`
	height: 500px;
	width: 325px;
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

const CoverImg = styled.img`
	width: 100%;
	height: auto;
`;

const BlogTitle = styled.h1`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
`;

const BlogSubtitle = styled.h3`
	font-family: 'Montserray', 'Helvetica', sans-serif;
`;

class BlogPreviewCard extends React.Component {
	render() {
		return (
			<CardContainer>
				<CoverImg src={this.props.postData.heroImage.file.url} alt={this.props.postData.heroImage.file.fileName} />
				<BlogTitle>{this.props.postData.title}</BlogTitle>
				<BlogSubtitle>{this.props.postData.subtitle}</BlogSubtitle>
				<h4>{this.props.postData.author.firstName}</h4>
				<p>Excerpt...</p>
				<h5>{this.props.postData.published}</h5>
			</CardContainer>
		);
	}
}

export default BlogPreviewCard;
