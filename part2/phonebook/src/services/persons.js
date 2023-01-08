import axios from "axios"

const serverUrl = 'http://127.0.0.1:3001/persons'

const getAll = () => {
   return axios.get(serverUrl).then(response => {
        return response.data
      })
}

const add = (person) => {
    return axios.post(serverUrl, person).then(response => {
        return response.data
    })
}

export default {getAll, add}