import fs from 'fs'
import path from 'path'

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email
    const feedback = req.body.feedback

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback
    }

    //  store database in a file

    /**
     * create a file path using path module from Node.js
     */
    const filePath = path.join(process.cwd(), 'data', 'feedback.json')

    /**
     * read a file that lives in `filePath` directory
     */
    const fileData = fs.readFileSync(filePath)

    /**
     * create data 
     */
    const data = JSON.parse(fileData)
    data.push(newFeedback)

    /**
     * write new data in `filePath` directory from `data` object before
     */
    fs.writeFileSync(filePath, JSON.stringify(data))

    /**
     * send response from API 
     */
    res.status(201).json({
      message: "Success",
      feedback: newFeedback
    })
  } else {
    res.status(200).json({
      message: "This Works!"
    })
  }
}

export default handler