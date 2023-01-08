const Header = ({name}) => {
    return (
    <h1>{name}</h1>
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
        </>
    )
}


export default Course