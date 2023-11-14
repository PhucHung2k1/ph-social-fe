export interface IResponse {
  data?: any;
  error?: any;
  status?: any;
}

export interface IConfig {
  baseURL?: string;
  headers?: { Authorization?: string };
  params?: object;
  onUploadProgress?: any;
}
