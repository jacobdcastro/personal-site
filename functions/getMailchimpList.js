const axios = require('axios');
// const md5 = require('blueimp-md5');

exports.handler = (event, context, callback) => {
  axios({
    method: 'GET',
    url: 'https://us3.api.mailchimp.com/3.0/lists/346f10540c',
    user: `jacob:${process.env.MC_API_KEY}`,
    crossdomain: true,
    headers: {
      Authorization: `apikey ${process.env.MC_API_KEY}`,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(({ data }) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
      });
    })
    .catch(err => {
      console.log(err);
    });
};
