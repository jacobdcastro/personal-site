import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

class GeneralForm extends React.Component {
  render() {
    return (
      <form id="genForm" name="genForm" method="POST" netlify>
        <legend>Have any questions or comments? Or just wanna say hi? Hit me up!</legend>
        <p class="required-text">* indicates required field</p>
        <div>
          <label for="genFirstName">First Name:*</label>
          <input type="text" name="firstName" id="genFirstName" required />
        </div>
        <div>
          <label for="genLastName">Last Name:</label>
          <input type="text" name="lastName" id="genLastName" />
        </div>
        <div>
          <label for="genEmail">Email:*</label>
          <input type="email" name="email" id="genEmail" required />
        </div>
        <div>
          <label for="genMessage">Message:*</label>
          <textarea name="message" type="text" id="genMessage" required></textarea>
        </div>
        <div class="recaptcha" netlify-recaptcha></div>
        <button class="submit-btn" type="submit">Submit</button>
      </form>
    );
  }
}

export default GeneralForm;
