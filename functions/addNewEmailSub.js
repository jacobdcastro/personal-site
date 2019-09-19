const axios = require('axios');
const md5 = require('blueimp-md5');

// TODO finish all steps for new subscribers

exports.handler = (event, context, callback) => {
  const formData = JSON.parse(event.body);
  const hash = md5(event.body.email);

  // 1. check to see if user is already subscribed
  //    to Jacob D. Castro Newsletter list
  axios({
    method: 'GET',
    url: `https://us3.api.mailchimp.com/3.0/lists/346f10540c/members/${hash}`,
    user: `jdc:${process.env.MC_API_KEY}`,
    crossdomain: true,
    headers: {
      Authorization: `apikey ${process.env.MC_API_KEY}`,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(({ data }) => {
      // 2. if user is already subbed, respond w/ 'already subbed' message
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
      });
    })
    .catch(err => {
      // 3. if user is not subscribed, add email, then respond with 'success' message
      if (err.response.data.status === 404) {
        addNewSub(formData);
      } else {
        console.log(err);
      }
    });

  const addNewSub = ({ firstName, email }) => {
    const reqBody = {
      email_address: email,
      status: 'pending',
      merge_fields: {
        FNAME: firstName,
      },
    };

    axios({
      method: 'POST',
      url: `https://us3.api.mailchimp.com/3.0/lists/346f10540c/members`,
      user: `jdc:${process.env.MC_API_KEY}`,
      crossdomain: true,
      headers: {
        Authorization: `apikey ${process.env.MC_API_KEY}`,
        'Access-Control-Allow-Origin': '*',
      },
      // body: JSON.stringify(reqBody),
      data: JSON.stringify(reqBody),
      // response: JSON.stringify(reqBody),
    })
      .then(({ data }) => {
        console.log(data);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        });
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          statusCode: err.response.status,
          body: 'JSON.stringify(err.response)',
        });
      });
  };

  // TODO
  // 4. catch error, reply with 'sorry, can you please try again?'
  // 5. if user tries 3 times with error, say 'please come back tomorrow!'
};
