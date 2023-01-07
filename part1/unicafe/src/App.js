import { useState } from 'react'

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)
const Title = ({text}) => (<h1>{text}</h1>)
const StatisticLine  = ({title, value, unit}) => (<tr><td>{title}</td><td>{value} {unit}</td></tr>)
const Statistics = ({data}) => {
  const feedbackValueMap = {'good': 1, 'neutral': 0, 'bad': -1}
  const [good, neutral, bad] = data
  const sumFeedback = good.count + neutral.count + bad.count

  if(sumFeedback === 0) 
    return (
      <>No feedback given</>
    )
  else 
    return (      
      <table>
        <tbody>
          <StatisticLine title={good.title} value={good.count} unit='' />
          <StatisticLine title={neutral.title} value={neutral.count} unit ='' />
          <StatisticLine title={bad.title} value={bad.count} unit = '' />  
          <StatisticLine title='all' value={sumFeedback} unit=''/>      
          <StatisticLine title='avarage' value={(good.count*feedbackValueMap['good'] + neutral.count*feedbackValueMap['neutral'] + (bad.count*feedbackValueMap['bad'])) / sumFeedback} unit=''/>      
          <StatisticLine title='positive' value={(good.count) *100 / sumFeedback} unit='%' /> 
        </tbody>
      </table>
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
  }
  const neutralFeedback = {
    title: 'neutral',
    count: neutral,
  }
  const badFeedback = {
    title: 'bad',
    count: bad
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