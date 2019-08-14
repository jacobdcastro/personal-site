import React from 'react';
import Layout from '../templates/layout';
import GeneralForm from '../components/GeneralForm';
import ProjectForm from '../components/ProjectForm';
import './normalize.css';

import { Container } from '../styles/ContactStyles';

const Contact = () => {
  const [genFormIsOpen, toggleGenForm] = useState(false);
  const [proFormIsOpen, toggleProForm] = useState(false);

  const showGenForm = () => {
    //if other form is open, close it first
    if (proFormIsOpen) {
      toggleProForm((proFormIsOpen = false));
    }
    toggleGenForm((genFormIsOpen = true));
  };

  const hideGenForm = () => {
    this.setState({
      genFormIsOpen: false,
    });
  };

  const showProjectForm = () => {
    if (genFormIsOpen) {
      toggleGenForm((genFormIsOpen = false));
    }

    toggleProForm((proFormIsOpen = true));
  };
  const hideProjectForm = () => {
    toggleProForm((proFormIsOpen = false));
  };

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
            {/* TODO turn buttons into <button> */}
            <div
              id="genBtn"
              className="formButton"
              onClick={genFormIsOpen ? hideGenForm : showGenForm}
            >
              Question or Comment
            </div>
            <div
              id="protBtn"
              className="formButton"
              onClick={proFormIsOpen ? hideProjectForm : showProjectForm}
            >
              I need a website built!
            </div>
          </div>
        </div>

        <GeneralForm open={state.genFormOpen} />

        <ProjectForm open={state.proFormOpen} />
      </Container>
    </Layout>
  );
};

export default Contact;
