import { useState } from 'react'

const Button = ({title, onClick}) => <button onClick={onClick}>{title}</button>
const Title = ({text}) => <h1>{text}</h1>
const App = () => {
  const getRandomAnecdote = () => {    
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteForAnecdote = () => {
    const tmp = [...votes]
    tmp[selected] = votes[selected]+1
    setAnecdoteVotes(tmp)
    if(votes[maxVotesAnecdote] < tmp[selected])
      setMaxVotesAnecdoteIndex(selected)
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const initVotes = Array(anecdotes.length).fill(0)  
  const [selected, setSelected] = useState(0)
  const [votes, setAnecdoteVotes] = useState(initVotes)
  const [maxVotesAnecdote, setMaxVotesAnecdoteIndex] = useState(0)

  console.log([...votes])
  return (
    <>
    <Title text='Anecdote of the day'/>
    <div>
      {anecdotes[selected]}                
    </div>    
    <div>
      has {votes[selected]} votes
    </div>
    <div>
      <Button title='vote' onClick={voteForAnecdote}/>
      <Button title='next anecdote' onClick={getRandomAnecdote}/>      
    </div>
    <Title text='Anecdote with most votes'/>
    <div>
      {anecdotes[maxVotesAnecdote]}                
    </div>
    <div>
      has {votes[maxVotesAnecdote]} votes
    </div>
    </>
  )
}

export default App
