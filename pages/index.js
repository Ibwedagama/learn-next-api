
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <form action="">
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">Insert your feedback</label>
          <textarea type="text" id="feedback" />
        </div>
        <div>
          <button type="submit">Send your feedback!</button>
        </div>
      </form>
    </div>
  )
}
