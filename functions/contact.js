/* eslint-disable */
const axios = require('axios');

exports.handler = async function(event, context) {
  console.log(event);
  try {
    const res = await axios.post('/', event.body);
    if (!res.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: res.status, body: res.statusText };
    }
    const data = await res.json();
    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
