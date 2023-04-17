// domain/.netlify/functions/1-hello
exports.handler = async (event, ctx, cb) => {
  // event ->

  // ctx

  // cb (err, res)
  // cb(null, {
  //   statusCode: 200,
  //   body: 'Our First Netlify Function Example',
  // });
  return {
    statusCode: 200,
    body: 'Hello World',
  };
};
