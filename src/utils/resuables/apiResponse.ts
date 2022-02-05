interface IResponse {
  meta: {
    status: number;
    message: string;
  };
  data?: any;
}

const apiResponse = (status: number, message: string, data = []): IResponse => {
  const response: IResponse = {
    meta: {
      status,
      message
    }
  };
  response.data = data;
  return response;
};

export default apiResponse;
