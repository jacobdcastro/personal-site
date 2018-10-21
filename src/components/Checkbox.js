import React from 'react';
import styled from 'styled-components';

const CheckLine = styled.div`
  margin: 7px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CheckboxLabel = styled.label`
font-family: 'Montserrat', 'Helvetica', sans-serif;

  margin-left: 10px;
  &:hover { cursor:pointer; }
`;

const Checkbox = styled.input`
  height: 25px;
  width: 25px;
  background-color: rgba(0,0,0,0);
  border-radius: 0;
  &:hover { cursor:pointer; }
`;

class CheckboxItem extends React.Component {
	render() {
		return (
			<CheckLine>
				<Checkbox
					type={this.props.info.input_type}
					id={this.props.info.id}
					name={this.props.info.name} />
				<CheckboxLabel htmlFor={this.props.info.label_for}>
					{this.props.info.label_text}
				</CheckboxLabel>
			</CheckLine>
		);
	}
}

export default CheckboxItem;
