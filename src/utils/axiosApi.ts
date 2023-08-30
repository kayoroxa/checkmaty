import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost:3010/api',
  // headers: {
  //   Authorization: 'Bearer ' + localStorage.getItem('token'),
  // },
})

export { axiosApi }
