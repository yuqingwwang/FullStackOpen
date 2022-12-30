import { useState } from 'react'

const scoreDict = {'good': 1, 'neutral': 0, 'bad': -1}

const Header = ({good, neutral, bad, setGood, setNeutral, setBad}) => {
  console.log({good, neutral, bad})

  return (<header>
    <h2>give feedback</h2>
    <button onClick={() => setGood(good+1)}>good </button>
    <button onClick={() => setNeutral(neutral+1)}>neutral </button>
    <button onClick={() => setBad(bad+1)}>bad </button>
    </header>)
}

const Stats = ({good, neutral, bad}) => {
  if ((good+neutral+bad) === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
  const avr = (good*scoreDict['good'] + neutral*scoreDict['neutral'] + bad*scoreDict['bad'])/3
  const positivePercent = good/(good+neutral+bad)
  return(<><h2>statistics</h2>
  <table>
    <tbody>
      <tr><td>good {good}</td></tr>
      <tr><td>neutral {neutral}</td></tr>
      <tr><td>bad {bad}</td></tr>
      <tr><td>average {avr}</td></tr>
      <tr><td>positive {positivePercent}</td></tr>
    </tbody>
  </table></>)
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title good={good} neutral={neutral} bad={bad}
      setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
