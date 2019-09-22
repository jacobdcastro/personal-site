import React, { useState } from 'react';
import axios from 'axios';

const EmailSubForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
  });
  const [formIsSubmitted, toggleIsSubmitted] = useState(false);

  const updateFormState = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  // subscribe an email to list
  const sendFormData = e => {
    e.preventDefault();
    // console.log('Form data sent! Sike!');
    axios
      .post('/.netlify/functions/addNewEmailSub', {
        ...formData,
      })
      .then(res => {
        // 204 === nothing happened, already subbed
        // 201 === new subscribe success
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="emailSubForm">
      <form id="newsletterSignup">
        <h3>Subscribe to my email newsletter!</h3>
        <p>
          A fun, every-other-tuesday newsletter featuring my new blog posts and
          tutorials, plus other useful, inspiring, or interesting content I've
          come across.
        </p>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={updateFormState}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={updateFormState}
          />
        </div>

        <span>No spam here, I promise.</span>
        <button onClick={sendFormData}>Subscribe!</button>
      </form>
    </div>
  );
};

export default EmailSubForm;
