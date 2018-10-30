import React from 'react';
import styled from 'styled-components';
import img from '../images/icons/tag-icon.svg';

const Container = styled.div`
	display: flex;
	align-items: center;
	width: auto;
	padding: 5px 10px;
	margin: 9px 5px;
	border-radius: 25px;
	&:hover {
		background-color: #eee;
		cursor: default;
	}
`;

const TagIcon = styled.img`
	height: 16px;
	width: auto;
	margin: 0 8px 0 0;
	padding: 0;
`;

const Tag = styled.h5`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	color: #a1a1a1;
	letter-spacing: 1px;
	font-size: 12px;
	margin: 0px;
	padding: 0;
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
