import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/',
  // headers: {
  //   Authorization: 'Bearer ' + localStorage.getItem('token'),
  // },
})

export { axiosApi }
