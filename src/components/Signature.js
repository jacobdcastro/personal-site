import React from 'react';
import styled from 'styled-components';

const fontFamily = 'font-family: \'Montserrat\', \'Helvetica\', sans-serif;';

const Container = styled.div`
	text-align: left;
	align-self: flex-start;
	@media (min-width: 820px) {
	margin: 0 auto 0 155px;
	}
`;

const Name = styled.h5`
	${fontFamily}
	font-size: 1.1em;
`;

const SignImg = styled.img`
	width: 100%;
	height: auto;
	@media (min-width: 520px) {
		width: 450px;
	}
`;

class Signature extends React.Component {
	render() {
		return (
			<Container>
				<Name>- Jacob D. Castro</Name>
				<SignImg src={require('../images/JDCastro_signature.png')} />
			</Container>
		);
	}
}

export default Signature;
