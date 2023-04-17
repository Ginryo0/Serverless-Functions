// domain/.netlify/functions/1-hello
exports.handler = async (event, ctx) => {
  return {
    statusCode: 200,
    body: 'Our First Netlify Function Example',
  };
};
