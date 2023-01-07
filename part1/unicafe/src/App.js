import { useState } from 'react'

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)
const Title = ({text}) => (<h1>{text}</h1>)
const DisplayStatistic = ({data}) => (<>{data.title} {data.count}</>)
const Statistics = ({data}) => {

  const [good, neutral, bad] = data
  const all = {
    title: 'all',
    count: good.count + neutral.count + bad.count
  }
  const avarage = {
    title: 'avarage',
    count: (good.count*good.value + neutral.count*neutral.value + (bad.count*bad.value)) / (good.count + neutral.count + bad.count)
  }
  const positive = {
    title: 'positive',
    count: (good.count) *100 / (good.count + neutral.count + bad.count)
  }

  if(good.count + neutral.count + bad.count === 0) 
    return (
      <>No feedback given</>
    )
  else 
    return (
      <>
      <DisplayStatistic data={good} />
      <br/>
      <DisplayStatistic data={neutral} />
      <br/>
      <DisplayStatistic data={bad} />  
      <br/>
      <DisplayStatistic data={all} />      
      <br/>
      <DisplayStatistic data={avarage} />      
      <br/>
      <DisplayStatistic data={positive} />     
      </>
    )
}

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
    count: good,
    value: 1,
  }
  const neutralFeedback = {
    title: 'neutral',
    count: neutral,
    value: 0,
  }
  const badFeedback = {
    title: 'bad',
    count: bad,
    value: -1,
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
      <Statistics data={[goodFeedback, neutralFeedback, badFeedback]}/>
      <br/>
    </>
  )
}

export default App