import React from 'react';
import Link from 'gatsby';
import styled from 'styled-components';

const CardContainer = styled.div`
	height: 120px;
	width: 90px;
`;

class BlogPostCard extends React.Component {
	render() {
		return (
			<CardContainer>
				<Link to={this.props.postData.slug}>
					<h1>{this.props.postData.title}</h1>
					<h3>{this.props.postData.subtitle}</h3>
				</Link>
			</CardContainer>
		);
	}
}

export default BlogPostCard;
