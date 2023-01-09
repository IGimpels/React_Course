import axios from "axios"

const baseUrl = '/api/persons'

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

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then((response) => response.data)
}

export default {getAll, add, deleteById, update}