import React, { useState } from 'react';
import axios from 'axios';

const EmailSubForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Jacob',
    email: 'jdcastro97@gmail.com',
  });
  const [formIsSubmitted, toggleIsSubmitted] = useState(false);

  // subscribe an email to list
  const sendFormData = () => {
    axios
      .post('/.netlify/functions/addNewEmailSub', {
        ...formData,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  // get general info on Newsletter sub list
  const getListData = () => {
    axios
      .get(`/.netlify/functions/getMailchimpList`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="emailSubForm">
      <h3>Subscribe!</h3>
      <p>I won't spam.</p>
      {/* assign field values to state */}
      <form></form>
      <button onClick={() => sendFormData()}>Get things!</button>
    </div>
  );
};

export default EmailSubForm;
