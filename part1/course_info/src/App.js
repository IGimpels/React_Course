const Header = (props) => {
  return (
  <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return ( 
  <p>
  {props.title} {props.count}
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content title={part1} count={exercises1}/>
      <Content title={part2} count={exercises2}/>
      <Content title={part3} count={exercises3}/>
      <Total count={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
