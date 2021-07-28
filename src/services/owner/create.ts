import axios from '../../config/axios';
import { AxiosResponse } from 'axios';

import { Owner } from '../../models/Owner';
import { ResponseAPI } from '../../models/ResponseAPI';

export default async (owner: Owner) => {
  return axios.post('/owner', owner)
    .then((response: AxiosResponse) => {
      if (response && response.data) {
        return response.data as ResponseAPI;       
      } else {
        return null;
      }
    })
    .catch(error => console.log(error));
}