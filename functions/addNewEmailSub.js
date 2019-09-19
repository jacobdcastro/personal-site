const axios = require('axios');
const md5 = require('blueimp-md5');

// TODO finish all steps for new subscribers

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const hash = md5(data.email);

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
        body: JSON.stringify(data.response),
      });
    })
    .catch(err => {
      // 3. if user is not subscribed, add email, then respond with 'success' message
      if (err.response.data.status === 404) {
        addNewSub(data);
      } else {
        console.log(err);
      }
    });

  const addNewSub = ({ firstName, email }) => {
    const data = JSON.stringify({
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
      },
    });

    axios({
      method: 'POST',
      url: `https://us3.api.mailchimp.com/3.0/lists/346f10540c/members`,
      user: `jdc:${process.env.MC_API_KEY}`,
      crossdomain: true,
      headers: {
        Authorization: `apikey ${process.env.MC_API_KEY}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    })
      .then(({ data }) => {
        console.log(data.response);
        // callback(null, {
        //   statusCode: 200,
        //   body: JSON.stringify(data.response),
        // });
      })
      .catch(err => {
        console.log('Welp! : ' + err.response.status);
        callback(null, {
          statusCode: err.response.status,
          body: 'hello ugh',
        });
      });
  };

  // 4. catch error, reply with 'sorry, can you please try again?'
  // 5. if user tries 3 times with error, say 'please come back tomorrow!'
};
