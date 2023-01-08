import axios from "axios"

const baseUrl = 'http://127.0.0.1:3001/persons'

const getAll = () => {
   return axios.get(baseUrl).then(response => {
        return response.data
      })
}

const add = (person) => {
    return axios.post(baseUrl, person).then(response => {
        return response.data
    })
}

const deleteById = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, add, deleteById}