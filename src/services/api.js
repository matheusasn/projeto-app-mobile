import axios from 'axios'

const api = axios.create({
    baseURL: 'https://demojc.sistemasjc.com.br/api/app/',
})


export default api; 