const responseMessage = (response, status, responseMessage, results = null) => {
  response.json({
    status,
    message: responseMessage,
    results,
  });
};

const emptyResponse = (response, status) => {
  response.status(status).json({});
};
module.exports = { responseMessage, emptyResponse };
