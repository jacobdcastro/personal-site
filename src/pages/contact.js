import React from 'react';
import styled from 'styled-components';
import './normalize.css';
import Layout from '../templates/layout';
import GeneralForm from '../components/GeneralForm';
import ProjectForm from '../components/ProjectForm';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: auto 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
`;

const MainContent = styled.div`
  background-color: #fafafa;
  width: 100%;
  padding: 12px 0 24px;
  margin: 2px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  padding: 15px;
  margin: auto 0;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormH2 = styled.h2`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  @media (min-width: 820px) {
    font-size: 2em;
  }
`;

const FormH3 = styled.h3`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  @media (min-width: 820px) {
    font-size: 1.6em;
  }
`;

const FormBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormButton = styled.button`
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  margin: 8px auto;
  background-color: #fff;
  padding: 10px;
  border: none;
  box-shadow: 0px 0px 8px #444;
  transition: 400ms;
  &:hover {
    cursor: pointer;
    transform: scale(1.08, 1.08);
  }
`;

class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.showGenForm = this.showGenForm.bind(this);
		this.hideGenForm = this.hideGenForm.bind(this);
		this.showProjectForm = this.showProjectForm.bind(this);
		this.hideProjectForm = this.hideProjectForm.bind(this);

		this.state = {
			genFormOpen: false,
			proFormOpen: false
		};
	}


	showGenForm() {
		//if other form is open, close it first
		if (this.state.proFormOpen) {
			this.setState({
				proFormOpen: false
			});
		}
		this.setState({
			genFormOpen: true
		});
	}
	hideGenForm() {
		this.setState({
			genFormOpen: false
		});
	}

	showProjectForm() {
		if (this.state.genFormOpen) {
			this.setState({
				genFormOpen: false
			});
		}
		this.setState({
			proFormOpen: true
		});
	}
	hideProjectForm() {
		this.setState({
			proFormOpen: false
		});
	}

	render() {
		return (
			<Layout
				pageTitle="Contact - "
				headline="Let's chat"
				className="contactPage"
				backgroundIsBlack={false}
			>
				<Body>
					<FormsHeader>
						<FormH2>I can't wait to hear from you!</FormH2>
						<FormH3>So, what do you need?</FormH3>
						<FormBtnContainer>
							<FormButton id="genBtn" onClick={this.state.genFormOpen ? this.hideGenForm : this.showGenForm}>Question or Comment</FormButton>
							<FormButton id="protBtn" onClick={this.state.proFormOpen ? this.hideProjectForm : this.showProjectForm} >I need a website built!</FormButton>
						</FormBtnContainer>
					</FormsHeader>

					<GeneralForm open={this.state.genFormOpen} />

					<ProjectForm open={this.state.proFormOpen} />
				
				</Body>
			</Layout>

		);
	}
}

export default Contact;
