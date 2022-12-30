import { useState } from 'react'

const scoreDict = {'good': 1, 'neutral': 0, 'bad': -1}

const Title = ({ children }) => <h1>{children}</h1>;

const Button = ({ text, addFeedback }) => {
  return (<>
   <button onClick={addFeedback}>{text}</button>
    </>)
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Stats = ({ title, data: { good, neutral, bad } }) => {
  if ((good+neutral+bad) === 0) {
    return (
      <>
        <h2>StatisticLines</h2>
        <p>No feedback given</p>
      </>
    );
  }

  const avr = (good*scoreDict['good'] + neutral*scoreDict['neutral'] + bad*scoreDict['bad'])/3
  const positivePercent = good/(good+neutral+bad)

  return(<>
   <Title>{title}</Title>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={avr} />
          <StatisticLine text="positive" value={positivePercent} />
        </tbody>
      </table>
  </>)
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Title>give feedback</Title>
      <Button text="good" addFeedback={() => setGood(good + 1)} />
      <Button text="neutral" addFeedback={() => setNeutral(neutral + 1)} />
      <Button text="bad" addFeedback={() => setBad(bad + 1)} />
      <Stats title="StatisticLines" data={{ good, neutral, bad }} />
    </>
  )
}

export default App
