import { useState } from 'react'


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
  return(<><h2>statistics</h2>
  <table>
    <tbody>
      <tr><td>good {good}</td></tr>
      <tr><td>neutral {neutral}</td></tr>
      <tr><td>bad {bad}</td></tr>
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
