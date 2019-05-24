import React from 'react';
import './normalize.css';
import Layout from '../templates/layout';
import GeneralForm from '../components/GeneralForm';
import ProjectForm from '../components/ProjectForm';

import { Container } from '../styles/ContactStyles';

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
        <Container>
          <div className="formsHeader">
            <h2>I can't wait to hear from you!</h2>
            <h3>So, what do you need?</h3>
            <div className="formBtnSection">
              <div
                id="genBtn"
                className="formButton"
                onClick={
                  this.state.genFormOpen ? this.hideGenForm : this.showGenForm
                }
              >
                Question or Comment
              </div>
              <div
                id="protBtn"
                className="formButton"
                onClick={
                  this.state.proFormOpen
                    ? this.hideProjectForm
                    : this.showProjectForm
                }
              >
                I need a website built!
              </div>
            </div>
          </div>

          <GeneralForm open={this.state.genFormOpen} />

          <ProjectForm open={this.state.proFormOpen} />
        </Container>
      </Layout>
    );
  }
}

export default Contact;
