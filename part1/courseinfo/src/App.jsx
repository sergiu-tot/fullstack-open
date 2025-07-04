const Header = props => {
    return <h1>{props.text}</h1>
}

const Part = props => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = props => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
      ]
  }


  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
