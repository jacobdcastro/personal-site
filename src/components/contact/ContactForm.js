import React, { useState } from 'react';
import encode from '../../utils/encode';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formState, setFormState] = useState({
    submitted: false,
    success: null,
  });
  const { name, email, message } = formData;
  const { submitting, success } = formState;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contactForm', ...formData }),
      });
      await setFormState({ submitting: false });
      setFormState({ success: true });
    } catch (error) {
      setFormState({ submitting: false, success: false });
      console.log(error);
    }
  };

  const handleChange = e => setFormData({ [e.target.name]: e.target.value });

  if (success === null) {
    return (
      <form
        id="contactForm"
        name="contactForm"
        onSubmit={e => {
          setFormState({ submitting: true });
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="name">
            Name<span>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">
            Email<span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">
            Message<span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            type="text"
            value={message}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        {submitting ? (
          <button type="submit">Submitting...</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    );
  } else if (success) {
    return <h3>Form submitted! thanks.</h3>;
  } else {
    return <h3>Form submission failed</h3>;
  }
};

export default ContactForm;
