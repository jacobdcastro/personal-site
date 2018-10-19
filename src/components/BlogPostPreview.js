import React, {PropTypes} from 'react';
import Link from 'gatsby';
import styled from 'styled-components';

class BlogPostPreview extends React.Component {
	render() {
		return (
			<div>
				<Link to={this.props.node.slug}>{this.props.node.title}</Link>
			</div>
		);
	}
}

export default BlogPostPreview;
