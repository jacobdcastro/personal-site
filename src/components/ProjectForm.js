import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

class ProjectForm extends React.Component {
  render() {
    return (
      <form id="projectForm" name="projectForm" method="POST" netlify>
        <legend>I just need a quick overview of your project!</legend>
        <p class="required-text">* indicates required field</p>
        <div>
          <label for="proFirstName">First Name:*</label>
          <input type="text" name="first-name" id="proFirstName" required />
        </div>
        <div>
          <label for="proLastName">Last Name:*</label>
          <input type="text" name="last-name" id="proLastName" required />
        </div>
        <div>
          <label for="proEmail">Email:*</label>
          <input type="email" name="email" id="proEmail" required />
        </div>
        <div>
          <label for="proCompany">Company:</label>
          <input type="text" name="company" id="proCompany" />
        </div>
        <div id="services">
          <legend>What services do you need done?</legend>
          <div>
            <input class="checkbox" type="checkbox" id="newSite" name="new_site" />
            <label class="check-label" for="newSite">New Website</label>
          </div>
          <div>
            <input class="checkbox" type="checkbox" id="currentSite" name="current_site" />
            <label class="check-label" for="currentSite">Work Done on Current Website</label>
          </div>
          <div>
            <input class="checkbox" type="checkbox" id="blog" name="blog" />
            <label class="check-label" for="blog">Blog</label>
          </div>
          <div>
            <input class="checkbox" type="checkbox" id="portfolio" name="portfolio" />
            <label class="check-label" for="portfolio">Portfolio Gallery</label>
          </div>
          <div>
            <input class="checkbox" type="checkbox" id="ecommerce" name="ecommerce" />
            <label class="check-label" for="ecommerce">Online Store</label>
          </div>
          <div>
            <input class="checkbox" type="checkbox" id="notSure" name="unknown" />
            <label class="check-label" for="notSure">I'm not sure!</label>
          </div>
        </div>
        <div>
          <label for="proMessage">Tell me about your project in a few sentences!</label>
          <textarea form="projectForm" type="text" name="description" id="proMessage" required></textarea>
        </div>
        <div class="recaptcha" data-netlify-recaptcha></div>
        <button class="submit-btn" type="submit">Submit</button>
      </form>
    );
  }
}

export default ProjectForm;
