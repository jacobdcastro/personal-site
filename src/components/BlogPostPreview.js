import React from 'react';
import Link from 'gatsby';
import styled from 'styled-components';

class BlogPostPreview extends React.Component {
	render() {
		return (
			<div>
				<Link to={this.props.posts.slug}>
					<h1>{this.props.posts.title}</h1>
					<h3>{this.props.posts.subtitle}</h3>
				</Link>
			</div>
		);
	}
}

export default BlogPostPreview;
