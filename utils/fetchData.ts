import { apiUrl } from '@/constants';
import axios from 'axios';

type PostData = {};
type PutData = {};

export const getDataAPI = async (url: string, token?: string) => {
  const res = await axios.get(`${apiUrl}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (
  url: string,
  post?: PostData,
  token?: string
) => {
  const res = await axios.post(`${apiUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (
  url: string,
  post: PutData,
  token?: string
) => {
  const res = await axios.put(`${apiUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url: string, post: any, token?: string) => {
  const res = await axios.patch(`${apiUrl}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url: string, token?: string) => {
  const res = await axios.delete(`${apiUrl}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
