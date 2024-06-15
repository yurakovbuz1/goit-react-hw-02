import { useEffect, useState } from 'react'
import './App.css'
import Description from './components/Description/Description'
import Feedback from './components/Feedback/Feedback'
import Options from './components/Options/Options'
import Notification from './components/Notification/Notification'

function App() {
  const [counter, setCount] = useState(() => {
    const localCounter = localStorage.getItem('counter');
    if (localCounter) return JSON.parse(localCounter);
    return {
      good: 0,
      neutral: 0,
      bad: 0
    }
  });



  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter))
  }, [counter])

  const totalFeedback = counter.good + counter.neutral + counter.bad;
  const percentage = totalFeedback > 0 ? Math.round((counter.good / totalFeedback) * 100) : 0;


  const updateFeedback = (feedbackType) => {
    if (feedbackType === 'reset') {
      setCount({ good: 0, bad: 0, neutral: 0 })
    } else {
      setCount({ ...counter, [feedbackType]: counter[feedbackType] + 1 })
    }
  }

  return (
    <>
      <Description />
      
      <Options value={counter} totalFeedback={totalFeedback} updateFeedback={updateFeedback} />

      {totalFeedback === 0 ? <Notification /> : <Feedback value={counter} totalFeedback={totalFeedback} positiveFeedback={percentage} />}
    </>
  )
}

export default App
