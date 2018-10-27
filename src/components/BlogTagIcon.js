import React from 'react';
import styled from 'styled-components';
import img from '../images/icons/tag-icon.svg';

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	width: auto;
	padding: 0px 12px;
	margin: 3px 5px;
	border-radius: 25px;
	&:hover {
		background-color: #eee;
		cursor: default;
	}
`;

const TagIcon = styled.img`
	height: 16px;
	width: auto;
	margin-right: 8px;
`;

const Tag = styled.h5`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	color: #a1a1a1;
	letter-spacing: 1px;
	font-size: 12px;
	margin: 0px;
	padding: 0;
	text-transform: lowercase;
`;

class BlogTagIcon extends React.Component {
	render() {
		return (
			<Container>
				<TagIcon src={img} alt="Tag Icon" />
				<Tag>{this.props.tag}</Tag>
			</Container>
		);
	}
}


export default BlogTagIcon;
