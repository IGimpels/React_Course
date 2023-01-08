import { useState } from 'react'

const App = () => {  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if(persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPerson = {
      name : newName,
      phone: newPhone
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  }

  const onNameInputChanged = (event) => {
    setNewName(event.target.value)
  }
  const onPhoneInputChanged = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={onNameInputChanged}/>          
        </div>
        <div>number: <input value={newPhone} onChange={onPhoneInputChanged}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(p => <div key={p.name}>{p.name} {p.phone}</div>)
      }
    </div>
  )
}

export default App
