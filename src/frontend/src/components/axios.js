import Axios from 'axios'

export const axios = Axios.create({ 
    baseURL: 'https://us-central1-edirect-be938.cloudfunctions.net/app/api/',
    headers: { Auth: 'Simple AUTH'},
})

export default axios


