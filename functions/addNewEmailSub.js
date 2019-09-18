const axios = require('axios');
const md5 = require('blueimp-md5');

// TODO finish all steps for new subscribers

exports.handler = (event, context, callback) => {
  // 1. check to see if user is already subscribed
  //    to Jacob D. Castro Newsletter list

  // 2. if user is already subbed, respond w/ 'already subbed' message

  // 3. if user is not subscribed, add email, then respond with 'success' message

  // 4. catch error, reply with 'sorry, can you please try again?'

  // 5. if user tries 3 times with error, say 'please come back tomorrow!'

  const hash = md5('jdcastro97@gmail.com');
  console.log(hash);
  console.log(event);

  // callback(null, {
  //   statusCode: 200,
  //   body: '!!!!!!!!',
  // });

  // ?change axios request(s) to follow steps above
  // axios({
  //   method: 'GET',
  //   url: 'https://us3.api.mailchimp.com/3.0/lists/346f10540c',
  //   user: `jacob:${process.env.MC_API_KEY}`,
  //   crossdomain: true,
  //   headers: {
  //     Authorization: `apikey ${process.env.MC_API_KEY}`,
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // })
  //   .then(({ data }) => {
  //     callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(data),
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};
