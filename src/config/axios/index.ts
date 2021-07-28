import axios from 'axios'

const baseURL = process.env.BASE_URL || 'https://localhost:5001/api/v1'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = baseURL

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (!config.url?.includes('login') && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
},
(error) => console.log(error));

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.log('Ha ocurrido un error')
    }
  })

export default axios