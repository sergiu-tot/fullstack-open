import { useState } from 'react'

const Header = (props) => { return <h1>{props.text}</h1> }

const Button = (props) => { return <button onClick={props.onClick}>{props.text}</button> }

const StatisticLine = (props) => { return <tr><td>{props.text}</td><td>{props.value}</td></tr> }

const Anecdote = (props) => { return <p>{props.text} <br /> has {props.votes} votes</p> }

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    const total = good + neutral + bad
    const average = (good - bad) / total || 0
    const positive = total > 0 ? (good / total * 100) + '%' : '0%'

    if (total === 0) {
        return <p>No feedback given</p>
    } else {
        return (
            <table><tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive} />
            </tbody></table>
        )
    }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }

  const [selected, setSelected] = useState(0)
  const [anecdoteVotes, setAnecdoteVotes] = useState(votes)

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateAnecdoteVotes = () => {
      const copyOfVotes = { ...anecdoteVotes }
      copyOfVotes[selected] += 1
      setAnecdoteVotes(copyOfVotes)
  }

  const mostVotes = Object.keys(anecdoteVotes).reduce((a, b) => anecdoteVotes[a] > anecdoteVotes[b] ? a : b)

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={anecdoteVotes[selected]} />
      <Button onClick={ () => updateAnecdoteVotes() } text="vote" />
      <Button onClick={ () => setSelected(Math.floor(Math.random() * anecdotes.length)) } text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostVotes]} votes={ anecdoteVotes[mostVotes] } />
      <Header text="give feedback" />
      <Button onClick={ () => setGood(good+1) } text="good" />
      <Button onClick={ () => setNeutral(neutral+1) } text="neutral" />
      <Button onClick={ () => setBad(bad+1) } text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App