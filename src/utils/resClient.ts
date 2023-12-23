const successCode = (content) => {
  return {
    status: 200,
    message: content.message,
    content: content.data,
    dateTime: new Date(),
  };
};
const errorCode = (content) => {
  return {
    status: 500,
    content: content.data,
    message: "Lỗi BE",
    dateTime: new Date(),
  };
};
export { successCode, errorCode };
