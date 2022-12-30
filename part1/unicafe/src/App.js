import { useState } from 'react'


const Header = (header) => {
  return (<header>
    <h2>give feedback</h2>
    <button>good</button>
    <button>neutral</button>
    <button>bad</button>
  </header>)
}

const Stats = (stats) => {
  return(<body><h2>statistics</h2>
  <p>good 6</p>
  <p>neutral 2</p>
  <p>bad 1</p>
  </body>)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title/>
      <Stats stats/>
    </div>
  )
}

export default App
