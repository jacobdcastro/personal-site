import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const fontFamily = 'font-family: \'Montserrat\', \'Helvetica\', sans-serif;';
const padMar = 'padding: 0; margin: 0;';

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 250px;
	width: auto;
	max-width: 415px;
	text-align: left;
	margin: auto;
	padding: 0;
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

const BlackLayer = styled.div`
	margin: 0;
	padding: 20px;
	background-color: rgba(0,0,0,0.5);
	height: 100%;
	width: auto;
	max-height: 250px;
	overflow: hidden;
`;

const BlogTitleSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: stretch;
	margin: auto auto 0;
	height: 100%;
	width: 80%;
	float: left;
`;

const BlogTitle = styled.h1`
	${fontFamily}
	font-size: 1.6em;
	letter-spacing: 3px;
	${padMar}
	text-decoration: none;
	color: white;
	text-transform: uppercase;
`;

const BlogSubtitle = styled.h3`
	${fontFamily}
	${padMar}
	font-size: 1.1em;
	text-decoration: none;
	color: white;
`;

const BlogAuthor = styled.h4`
	${fontFamily}
	${padMar}
	font-size: 1em;
	text-decoration: none;
	color: white;
`;

const BlogExcerpt = styled.p`
	${fontFamily}
	padding: 0;
	margin: 0px;
	text-decoration: none;
	color: white;
	overflow: hidden;
`;

const DatePublished = styled.h5`
	${fontFamily}
	${padMar}
	font-size: 1.05em;
	letter-spacing: 1px;
	text-decoration: none;
	color: white;
`;

class BlogPreviewCard extends React.Component {
	render() {
		const data = this.props.postData;
		const imageURL = `${data.heroImage.file.url}?`;
		return (
			<CardContainer url={imageURL}>
				<BlackLayer>
					<BlogTitleSection>
						<BlogTitle>{data.title}</BlogTitle>
						<BlogSubtitle>{data.subtitle}</BlogSubtitle>
						{/* <BlogAuthor>By: {data.author.name}</BlogAuthor> */}
						<BlogExcerpt>{data.bodyContent.childMarkdownRemark.excerpt}</BlogExcerpt>
						<DatePublished>{data.published}</DatePublished>
					</BlogTitleSection>
				</BlackLayer>
			</CardContainer>
		);
	}
}

export default BlogPreviewCard;
