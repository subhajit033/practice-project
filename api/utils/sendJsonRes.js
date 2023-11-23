const sendJsonRes = (res, statusCode, data, options) => {
  let jsonObj = {
    status: 'success',
    data: {
      data,
    },
  };
  if (options) {
    jsonObj = { ...jsonObj, ...options };
  }
  res.status(statusCode).json(sendJsonRes);
};

export default sendJsonRes;
