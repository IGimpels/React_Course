import { useState } from 'react'

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)
const Title = ({text}) => (<h1>{text}</h1>)
const DisplayStatistic = ({data}) => (<>{data.title} {data.count}</>)

const App = () => {

  const addGoodFeedback = () => setGood(good+1)
  const addNeutralFeedback = () => setNeutral(neutral+1)
  const addBadFeedback = () => setBad(bad+1)

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = {
    title: 'good',
    count: good
  }
  const neutralFeedback = {
    title: 'neutral',
    count: neutral
  }
  const badFeedback = {
    title: 'bad',
    count: bad
  }

  const allFeedback = {
    title: 'all',
    count: good + neutral + bad
  }

  const avarageFeedback = {
    title: 'avarage',
    count: (good + neutral*0 + (bad*-1)) / (good + neutral + bad)
  }

  const positiveFeedback = {
    title: 'positive',
    count: (good) *100 / (good + neutral + bad)
  }

  return (
    <>
      <Title text='give feedback'/>
      <div>
        <Button text={goodFeedback.title} onClick={addGoodFeedback}/>
        <Button text={neutralFeedback.title} onClick={addNeutralFeedback}/>
        <Button text={badFeedback.title} onClick={addBadFeedback}/>
      </div>
      <Title text='statistics'/>
      <DisplayStatistic data={goodFeedback} />
      <br/>
      <DisplayStatistic data={neutralFeedback} />
      <br/>
      <DisplayStatistic data={badFeedback} />  
      <br/>
      <DisplayStatistic data={allFeedback} />      
      <br/>
      <DisplayStatistic data={avarageFeedback} />      
      <br/>
      <DisplayStatistic data={positiveFeedback} />      
      <br/>
    </>
  )
}

export default App