const NewPersonForm = ({ onNewSubmit, onNameInputChanged, onPhoneNumberInputChanged, newName, newNumber }) => {
    return (
      <form onSubmit={onNewSubmit}>
        <div>
          name: <input value={newName} onChange={onNameInputChanged} />
        </div>
        <div>number: <input value={newNumber} onChange={onPhoneNumberInputChanged} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default NewPersonForm