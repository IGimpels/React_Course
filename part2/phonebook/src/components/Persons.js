const Person = ({person, onDelete}) => {
   return <div>{person.name} {person.number} <button onClick={() => onDelete(person)}>delete</button></div>
}
const Persons = ({ persons, onDelete }) => persons.map(p => <Person key={p.name} person={p} onDelete={onDelete}/>)


  export default Persons