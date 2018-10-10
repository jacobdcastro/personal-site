import React from 'react';
import FormLine from './FormLine';
import CheckboxItem from './Checkbox';
import TextArea from './TextArea';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-between;
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
  align-items: center;
  width: 100%;
`;

const NameLine = styled.div`
  width: 48%;
  &:nth-child(2) {
    margin-left: 4%;
  }
`;

const ServicesSection = styled.div`
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin: 25px;
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

class ProjectForm extends React.Component {
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
      company: {
        label_text: 'Company:',
        label_for: 'proCompany',
        input_type: 'text',
        name: 'company',
        id: 'proCompany',
        required: false
      },
      textarea: {
        label_text: 'Message:*',
        label_for: 'genMessage',
        input_type: 'text',
        name: 'message',
        id: 'genMessage',
        required: true
      },
      checkbox: {
        new_site:{
          label_text: 'New Website',
          label_for: 'newSite',
          input_type: 'checkbox',
          id: 'newSite',
          name: 'new_site'
        },
        current_site: {
          label_text: 'Work Done on Current Website',
          label_for: 'currentSite',
          input_type: 'checkbox',
          id: 'currentSite',
          name: 'current_site'
        },
        blog: {
          label_text: 'Blog',
          label_for: 'blog',
          input_type: 'checkbox',
          id: 'blog',
          name: 'blog'
        },
        portfolio: {
          label_text: 'Portfolio',
          label_for: 'portfolio',
          input_type: 'checkbox',
          id: 'portfolio',
          name: 'portfolio'
        },
        ecommerce: {
          label_text: 'Online Store',
          label_for: 'ecommerce',
          input_type: 'checkbox',
          id: 'ecommerce',
          name: 'ecommerce'
        },
        not_sure: {
          label_text: "I'm not sure!",
          label_for: 'notSure',
          input_type: 'checkbox',
          id: 'notSure',
          name: 'unknown'
        }
      }
    }
  }

  render() {
    return (
      <Form
        height={this.props.open ? 'auto' : '0px'}
        padding={this.props.open ? '20px' : '0px'}
        margin={this.props.open ? '22px' : '0px'}
        id="projectForm"
        name="projectForm"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="projectForm" />
        <Legend>I just need a quick overview of your project!</Legend>
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
        <FormLine info={this.state.company} />

        <ServicesSection>
          <Legend>What services do you need done?</Legend>
          <CheckboxItem info={this.state.checkbox.new_site} />
          <CheckboxItem info={this.state.checkbox.current_site} />
          <CheckboxItem info={this.state.checkbox.blog} />
          <CheckboxItem info={this.state.checkbox.portfolio} />
          <CheckboxItem info={this.state.checkbox.ecommerce} />
          <CheckboxItem info={this.state.checkbox.not_sure} />
        </ServicesSection>

        <TextArea info={this.state.textarea} />

        <Recaptcha data-netlify-recaptcha></Recaptcha>
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </Form>
    );
  }
}

export default ProjectForm;
