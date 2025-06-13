const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => parts.map(part => <Part part={part} key={part.id} />)

const Part = ({part}) => {
    return (<p>{part.name} {part.exercises}</p>)
}

const Course = ({course}) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <strong>total of {total} exercises</strong>
        </>
        )
}

export default Course