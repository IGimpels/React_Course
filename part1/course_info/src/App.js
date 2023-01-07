const Header = (props) => {
  return (
  <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return ( 
    <>
      <Part data={props.part1}/>
      <Part data={props.part2}/>
      <Part data={props.part3}/>    
    </>
  )
  
}

const Part = (props) => {
  return (
  <p>
  {props.data.name} {props.data.exercises}
  </p>
  )
}

const Total = (props) => {
  return (
  <p>Number of exercises {props.count}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total count={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App
