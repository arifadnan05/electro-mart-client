import axios from 'axios'
const axiosPublic = axios.create({
    // baseURL: 'http://localhost:4000'
    baseURL: 'https://electro-mart-alpha.vercel.app'
})
const useAxiosPublic = () => {
  return axiosPublic 
  
}

export default useAxiosPublic