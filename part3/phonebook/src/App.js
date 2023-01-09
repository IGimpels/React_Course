import { useState, useEffect } from 'react'
import personsClient from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import NewPersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [triggerPersonListUpdate, setTriggerPersonListUpdate] = useState(false)

  useEffect(() => {
    personsClient.getAll().then(personsList => {
      setPersons(personsList)
    })
  }, [triggerPersonListUpdate])

  const addNewName = (event) => {
    event.preventDefault()

    if (newName === '') {
      setNotification({ message: `Can't add person with empty name`, isError: true })
      setTimeout(() => setNotification(null), 5000)
      return
    }
    const duplicate = persons.find(p => p.name === newName)

    if (duplicate) {

      if (!window.confirm(`${duplicate.name} is already added to phonebook, replace the old number with a new one?`))
        return

      personsClient.update({ ...duplicate, number: newNumber }).then((updatedPerson) => {
        setPersons(persons.map((p) => p.id !== updatedPerson.id ? p : updatedPerson))
        setNotification({ message: `Updated ${updatedPerson.name}`, isError: false })
        setTimeout(() => setNotification(null), 5000)
      }).catch(() => {
        setPersons(persons.filter(p => p.id !== duplicate.id))
        setNotification({ message: `Information of ${duplicate.name} has already been removed from server`, isError: true })
        setTimeout(() => setNotification(null), 5000)
      })
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    personsClient.add(newPerson).then(person => {
      setPersons(persons.concat(person))
      setNotification({ message: `Added ${person.name}`, isError: false })
      setTimeout(() => setNotification(null), 5000)
    }).catch(r => {
      if(r.response.status  === 409){
        setNotification({ message: `${newPerson.name} is already added to phonebook`, isError: true })
        setTimeout(() => setNotification(null), 5000)
        setTriggerPersonListUpdate(!triggerPersonListUpdate)
      }
    })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}`))
      return
    personsClient.deleteById(person.id).then(() => {
      setPersons(persons.filter(p => p.id !== person.id))
      setNotification({ message: `Deleted ${person.name}`, isError: false })
      setTimeout(() => setNotification(null), 5000)
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
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchValue={searchName} onSearchValueChanged={onSearchNameChanged} />
      <h2>add a new</h2>
      <NewPersonForm onNewSubmit={addNewName} newName={newName} newNumber={newNumber} onNameInputChanged={onNameInputChanged} onPhoneNumberInputChanged={onPhoneNumberInputChanged} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
