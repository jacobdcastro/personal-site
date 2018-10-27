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
	font-size: 1.8em;
	letter-spacing: 3px;
	text-decoration: none;
	color: #353535;
	text-transform: uppercase;
`;

const BlogSubtitle = styled.h3`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	text-decoration: none;
	color: #353535;
`;

const BlogAuthor = styled.h4`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	text-decoration: none;
	color: #353535;
`;

const BlogExcerpt = styled.p`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	text-decoration: none;
	color: #353535;
`;

const DatePublished = styled.h5`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	text-decoration: none;
	color: #353535;
`;

class BlogPreviewCard extends React.Component {
	render() {
		const data = this.props.postData;
		console.log(data);
		return (
			<CardContainer>
				<CoverImg src={data.heroImage.file.url} alt={data.heroImage.file.fileName} />
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
