import { useState } from 'react'

const Filter = ({searchValue, onSearchValueChanged}) => {
  return (<div>filter shown with <input value={searchValue} onChange={onSearchValueChanged}/></div>)
}

const NewPersonForm = ({onNewSubmit, onNameInputChanged, onPhoneNumberInputChanged, newName, newNumber}) => {
  return (
      <form onSubmit={onNewSubmit}>
      <div>
        name: <input value={newName} onChange={onNameInputChanged}/>          
      </div>
      <div>number: <input value={newNumber} onChange={onPhoneNumberInputChanged}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => 
        persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)

const App = () => {  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if(persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPerson = {
      name : newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = searchName === '' ? persons : persons.filter(p => p.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)

  const onNameInputChanged = (event) => {
    setNewName(event.target.value)
  }
  const onPhoneNumberInputChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const onSearchNameChanged = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>      
      <Filter searchValue={searchName} onSearchValueChanged={onSearchNameChanged}/>
      <h2>add a new</h2>      
      <NewPersonForm onNewSubmit={addNewName} newName={newName} newNumber={newNumber} onNameInputChanged={onNameInputChanged} onPhoneNumberInputChanged={onPhoneNumberInputChanged} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
