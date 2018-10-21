import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 9px auto;
`;

const Label = styled.label`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  padding-bottom: 4px;
`;

const Input = styled.input`
  font-family: 'Open Sans', sans-serif;
  padding: 8px;
  border: 3px solid #999;
  background-color: rgba(0,0,0,0);
  font-weight: 500;
  letter-spacing: 1px;
`;

class FormLine extends React.Component {
	render() {
		return (
			<Container>
				<Label htmlFor={this.props.info.label_for}>
					{this.props.info.label_text}
				</Label>
				<Input
					type={this.props.info.input_type}
					name={this.props.info.name}
					id={this.props.info.id}
					required={this.props.info.required} />
			</Container>
		);
	}
}

export default FormLine;
