import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const fontFamily = 'font-family: \'Montserrat\', \'Helvetica\', sans-serif;';

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 90%;
	height: 250px;
	max-width: 415px;
	text-align: left;
	margin: 14px auto;
	padding: 12px;
	background-image: url(${props => props.url});
	background-position: center;
	background-size: cover;
	box-shadow: 0 5px 17px #676767;
	transition: 0.5s;
	&:hover {
		cursor: pointer;
		transform: scale(1.05, 1.05);
	}
`;

const BlogTitle = styled.h1`
	${fontFamily}
	font-size: 1.4em;
	letter-spacing: 3px;
	text-decoration: none;
	color: white;
	text-transform: uppercase;
`;

const BlogSubtitle = styled.h3`
	${fontFamily}
	font-size: 1.1em;
	text-decoration: none;
	color: white;
`;

const BlogAuthor = styled.h4`
	${fontFamily}
	font-size: 1em;
	text-decoration: none;
	color: white;
`;

const BlogExcerpt = styled.p`
	${fontFamily}
	text-decoration: none;
	color: white;
`;

const DatePublished = styled.h5`
	${fontFamily}
	text-decoration: none;
	color: white;
`;

class BlogPreviewCard extends React.Component {
	render() {
		const data = this.props.postData;
		const imageURL = `${data.heroImage.file.url}?`;
		return (
			<CardContainer url={imageURL}>
				<BlogTitle>{data.title}</BlogTitle>
				<BlogSubtitle>{data.subtitle}</BlogSubtitle>
				<BlogAuthor>By: {data.author.name}</BlogAuthor>
				<BlogExcerpt>Excerpt...</BlogExcerpt>
				<DatePublished>{data.published}</DatePublished>
			</CardContainer>
		);
	}
}

export default BlogPreviewCard;
