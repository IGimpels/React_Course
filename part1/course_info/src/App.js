const Header = (props) => {
  return (
  <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return ( 
    <>
      <Part title={props.title1} count={props.count1}/>
      <Part title={props.title2} count={props.count2}/>
      <Part title={props.title3} count={props.count3}/>    
    </>
  )
  
}

const Part = (props) => {
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
      <Content title1={part1} count1={exercises1} title2={part2} count2={exercises2} title3={part3} count3={exercises3}/>
      <Total count={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
