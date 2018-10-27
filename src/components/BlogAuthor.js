import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	margin: 5px auto;
	text-align: center;
`;

const Avatar = styled.img`
	height: 50px;
	width: auto;
	border-radius: 100%;
`;

const AuthorHeadline = styled.h3`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	letter-spacing: 1px;
	color: #353535;
`;

const Name = styled.h4`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	letter-spacing: 1px;
	color: #353535;
`;

const Bio = styled.p`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	letter-spacing: 1px;
	color: #353535;
`;

class BlogAuthor extends React.Component {
	render() {
		return (
			<Container>
				<AuthorHeadline>Author:</AuthorHeadline>
				<Avatar src={this.props.authorData.avatar.file.url} />
				<Name>{this.props.authorData.name}</Name>
				<Bio>{this.props.authorData.biography.biography}</Bio>
			</Container>
		);
	}
}
export default BlogAuthor;
