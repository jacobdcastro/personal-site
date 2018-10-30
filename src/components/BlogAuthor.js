import React from 'react';
import styled from 'styled-components';

const AuthorWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 3px;
	margin: 8px auto;
	max-width: 555px;
`;

const Avatar = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	@media (min-width: 540px) {
		height: 65px;
		width: 65px;
	}
`;

const NameSection = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 75px;
`;

const Name = styled.h4`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	text-align: center;
	letter-spacing: 1px;
	color: #353535;
	margin: 0;
	padding-bottom: 0;
`;

const Bio = styled.p`
	font-family: 'Montserrat', 'Helvetica', sans-serif;
	letter-spacing: 1px;
	text-align: left;
	font-size: 12px;
	color: #353535;
	margin: 0;
	padding: 0;
`;

class BlogAuthor extends React.Component {
	render() {
		return (
			<AuthorWrapper>
				<Avatar src={this.props.authorData.avatar.file.url} />
				<NameSection>
					<Name>{this.props.authorData.name}</Name>
					<Bio>{this.props.authorData.biography.biography}</Bio>
				</NameSection>
			</AuthorWrapper>
		);
	}
}
export default BlogAuthor;
