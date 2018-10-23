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
		const data = this.props.postData;
		console.log(data);
		return (
			<CardContainer>
				<CoverImg src={data.heroImage.file.url} alt={data.heroImage.file.fileName} />
				<BlogTitle>{data.title}</BlogTitle>
				<BlogSubtitle>{data.subtitle}</BlogSubtitle>
				<h4>By: {data.author.firstName}</h4>
				<p>Excerpt...</p>
				<h5>{data.published}</h5>
			</CardContainer>
		);
	}
}

export default BlogPreviewCard;
