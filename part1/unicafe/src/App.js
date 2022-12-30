import { useState } from 'react'


const Header = (header) => {
  return (<header>
    <h2>give feedback</h2>
    <button>good</button>
    <button>neutral</button>
    <button>bad</button>
  </header>)
}

const Stats = ({good, neutral, bad}) => {
  return(<><h2>statistics</h2>
  <table>
    <tbody>
      <tr>good {good}</tr>
      <tr>neutral {neutral}</tr>
      <tr>bad {bad}</tr>
    </tbody>
  </table></>)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
