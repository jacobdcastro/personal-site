import React from 'react';
import FormLine from './FormLine';
import TextArea from './TextArea';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  max-width: 635px;
  height: ${props => props.height};
  overflow: hidden;
  text-align: left;
  background-color: #fff;
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  box-shadow: 0px 0px 8px #444;
  transition: 300ms;
`;

const Legend = styled.legend`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1.1em;
  margin: 0px 8px;
`;

const ReqText = styled.p`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  width: 100%;
`;

const NameLine = styled.div`
  width: 48%;
  &:nth-child(2) {
    margin-left: 4%;
  }
`;

const Recaptcha = styled.div`
  padding: 0;
  margin: 2px auto 8px;
`;

const SubmitBtn = styled.button`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  font-weight: 700;
  font-size: 1.05em;
  letter-spacing: 1px;
  color: white;
  background-color: #353535;
  padding: 12px;
  margin: 7px auto;
  box-shadow: none;
  border: none;
  &:hover { cursor:pointer; }

  @media (min-width: 820px) {
    padding: 15px;
    font-size: 1.1em;
  }
`;

class GeneralForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: {
        label_text: 'First Name:*',
        label_for: 'genFirstName',
        input_type: 'text',
        name: 'firstName',
        id: 'genFirstName',
        required: true
      },
      last_name: {
        label_text: 'Last Name:',
        label_for: 'genLastName',
        input_type: 'text',
        name: 'lastName',
        id: 'genLastName',
        required: false
      },
      email: {
        label_text: 'Email:*',
        label_for: 'genEmail',
        input_type: 'email',
        name: 'email',
        id: 'genEmail',
        required: true
      },
      textarea: {
        label_text: 'Message:*',
        label_for: 'genMessage',
        input_type: 'text',
        name: 'message',
        id: 'genMessage',
        required: true
      }
    }
  }

  render() {
    return (
      <Form
        height={this.props.open ? 'auto' : '0px'}
        padding={this.props.open ? '20px' : '0px'}
        margin={this.props.open ? '22px' : '0px'}
        id="genForm"
        name="genForm"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="genForm" />
        <Legend>Have any questions or comments? Or just wanna say hi? Hit me up!</Legend>
        <ReqText>* indicates required field</ReqText>
        <NameSection>
          <NameLine>
            <FormLine info={this.state.first_name} />
          </NameLine>
          <NameLine>
            <FormLine info={this.state.last_name} />
          </NameLine>
        </NameSection>
        <FormLine info={this.state.email} />
        <TextArea info={this.state.textarea} />
        <Recaptcha netlify-recaptcha></Recaptcha>
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </Form>
    );
  }
}

export default GeneralForm;
