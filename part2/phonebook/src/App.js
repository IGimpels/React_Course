import { useState, useEffect} from 'react'
import personsClient from './services/persons'

const Notification = ({message}) => {

  if(message === null)
    return <></>
  const notificationStyle = {
    width: '100%',
    color: 'green',
    border: '3px solid green',
    borderRadius: '5px',
    backgroundColor: 'lightgray',
    padding: '15px',
    fontSize: '22px',

  }
  return <div style={notificationStyle}>{message}</div>
}

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

const Persons = ({persons, onDelete}) =>  
  persons.map(p => <div key={p.name}>{p.name} {p.number} <button onClick={() => onDelete(p)}>delete</button></div>)


const App = () => {  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationText, setNotificationText] = useState(null)

  useEffect(() => {
    personsClient.getAll().then(personsList => {
      setPersons(personsList)
    })
  },[])

  const addNewName = (event) => {
    event.preventDefault()
    
    if(newName === ''){    
      alert(`${newName} can't add empty person`)
      return
    }
    const duplicates = persons.filter(p => p.name === newName)

    if(duplicates.length>0){      
      if(!window.confirm(`${duplicates[0].name} is already added to phonebook, replace the old number with a new one?`))
        return      
      
        personsClient.update({...duplicates[0], number : newNumber}).then((updatedPerson) => {
        setPersons(persons.map((p) => p.id !== updatedPerson.id ? p : updatedPerson))         
        setNotificationText(`Updated ${updatedPerson.name}`)
        setTimeout(() => setNotificationText(null), 5000)
      })
      setNewName('')
      setNewNumber('')
      return
    }
    
    const newPerson = {
      name : newName,
      number: newNumber
    }
    personsClient.add(newPerson).then(person => {      
      setPersons(persons.concat(person))
      setNotificationText(`Added ${person.name}`)
      setTimeout(() => setNotificationText(null), 5000)
    })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if(!window.confirm(`Delete ${person.name}`))
      return
    personsClient.deleteById(person.id).then( () => {
      setPersons(persons.filter(p => p.id !== person.id))
      setNotificationText(`Deleted ${person.name}`)
      setTimeout(() => setNotificationText(null), 5000)
    })
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
      <Notification message={notificationText}/>
      <h2>Phonebook</h2>      
      <Filter searchValue={searchName} onSearchValueChanged={onSearchNameChanged}/>
      <h2>add a new</h2>      
      <NewPersonForm onNewSubmit={addNewName} newName={newName} newNumber={newNumber} onNameInputChanged={onNameInputChanged} onPhoneNumberInputChanged={onPhoneNumberInputChanged} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson}/>
    </div>
  )
}

export default App
