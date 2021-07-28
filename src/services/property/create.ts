import axios from '../../config/axios';
import { AxiosResponse } from 'axios';

import { Property } from '../../models/Property';
import { ResponseAPI } from '../../models/ResponseAPI';

export default async (property: Property) => {
  return axios.post('/property', property)
    .then((response: AxiosResponse) => {
      if (response && response.data) {
        return response.data as ResponseAPI;       
      } else {
        return null;
      }
    })
    .catch(error => console.log(error));
}