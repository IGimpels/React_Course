const Header = ({name}) => {
    return (
    <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (     
      <>     
      {
        parts.map((p) => 
            <Part key={p.id} data={p}/>
        )
      }
      </>
    )    
  }

  const Total = ({parts}) => {
    return (
        <b>total of {parts.reduce((sum, p) => sum + p.exercises, 0)} exercises</b>
    )
  }
  
  const Part = ({data}) => {
    return (
    <p>
    {data.name} {data.exercises}
    </p>
    )
  }


const Course = ({course}) => {
    return (                
        <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </>
    )
}


export default Course