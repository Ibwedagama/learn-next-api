import { useRef, useState } from 'react'


export default function HomePage() {
  const email = useRef()
  const feedback = useRef()

  const submitFormHandler = (event) => {
    event.preventDefault()

    const userEmail = email.current.value
    const userFeedback = feedback.current.value

    const reqBody = { email: userEmail, feedback: userFeedback }

    console.log(reqBody)

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const [feedbackData, setFeedbackData] = useState([])

  const getFeedbackData = () => {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedbackData(data.feedback)
      })
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={email} />
        </div>
        <div>
          <label htmlFor="feedback">Insert your feedback</label>
          <textarea type="text" id="feedback" ref={feedback} />
        </div>
        <div>
          <button type="submit">Send your feedback!</button>
        </div>
      </form>

      <hr />

      <button onClick={getFeedbackData}>Get Feedback data</button>

      <ul>
        {feedbackData && feedbackData.map(data => (
          <li><p>{data.feedback}</p></li>
        ))}
      </ul>
    </div>
  )
}
