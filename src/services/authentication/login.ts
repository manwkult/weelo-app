import axios from '../../config/axios';
import { AxiosResponse } from 'axios';

import { User } from '../../models/User';
import { ResponseAPI } from '../../models/ResponseAPI';

export default async (user: User) => {
  return axios.post('/login', user)
    .then((response: AxiosResponse) => {
      if (response && response.data) {
        return response.data as ResponseAPI;       
      } else {
        return null;
      }
    })
    .catch(error => console.log(error));
}