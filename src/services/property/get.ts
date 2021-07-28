import axios from '../../config/axios';
import { AxiosResponse } from 'axios';

import { ResponseAPI } from '../../models/ResponseAPI';

export default async () => {
  return axios.get('/property')
    .then((response: AxiosResponse) => {
      if (response && response.data) {
        return response.data as ResponseAPI;       
      } else {
        return null;
      }
    })
    .catch(error => console.log(error));
}