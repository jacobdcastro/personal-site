import React from 'react';
import styled from 'styled-components';
import BlogAuthor from './BlogAuthor';
import BlogTagIcon from './BlogTagIcon';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	padding: 5px;
	margin: 5px auto;
`;

const Subtitle = styled.h3`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	text-align: center;
	color: #353535;
	letter-spacing: 3px;
	text-transform: uppercase;
	padding: 0;
	margin: auto;
`;

const TagSection = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0;
	padding: 0;
`;

class BlogSubheader extends React.Component {
	render() {
		return (
			<Container>
				<Subtitle>{this.props.data.subtitle}</Subtitle>
				<TagSection>
					{this.props.data.tags.map((tag) => {
						return <BlogTagIcon tag={tag.toLowerCase()} key={tag.id} />;
					})}
				</TagSection>
				<BlogAuthor authorData={this.props.data.author} />
			</Container>
		);
	}
}

export default BlogSubheader;
