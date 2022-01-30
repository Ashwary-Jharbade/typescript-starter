interface IResponse {
  meta: {
    status: number;
    message: string;
  };
  data?: any;
  error?: any;
}

const apiResponse = (
  status: number,
  message: string,
  data = [],
  err = null
): IResponse => {
  const response: IResponse = {
    meta: {
      status,
      message
    }
  };
  if (err) {
    response.error = err;
    return response;
  }
  response.data = data;
  return response;
};

export default apiResponse;
