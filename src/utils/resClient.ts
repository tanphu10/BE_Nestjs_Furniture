const successCode = (content) => {
  // console.log("check", content);
  return {
    status: 200,
    message: content.message,
    data: { content: content.data },
    dateTime: new Date(),
  };
};
const successAuthCode = (content) => {
  return {
    statusCode: 200,
    message: content.message,
    data: {
      content: content.data,
      access_token: content.token,
      refresh_token: content.retoken,
    },
    dateTime: new Date(),
  };
};
const errorCode = (content) => {
  return {
    status: 500,
    data: { content: content.data },
    message: "Lỗi BE",
    dateTime: new Date(),
  };
};
export { successCode, errorCode, successAuthCode };
