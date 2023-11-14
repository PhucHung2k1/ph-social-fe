import type { AxiosError } from 'axios';

export type ErrorResponse = {
  headers: any;
  data: any;
  message: string;
  status: number;
};

export function catchAxiosError(err: AxiosError) {
  const error = {
    headers: null,
    data: err.response?.data,
    message:
      'Something happened in setting up the request that triggered an Error',
    status: null,
  } as unknown as ErrorResponse;

  if (err && err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.headers = err.response.headers;
    error.message = (err.response.data as { message: string }).message;
    error.status = err.response.status;
  } else if (err && err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error.headers = err.request.headers;
    error.message = 'The request was made, but no response was received';
  }

  return { error };
}
