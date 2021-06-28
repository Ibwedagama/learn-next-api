import fs from 'fs'
import path from 'path'

const buildFilePath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

const loadFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}

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

    const filePath = buildFilePath()
    const data = loadFeedback(filePath)
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))

    res.status(201).json({
      message: "Success",
      feedback: newFeedback
    })
  } else if (req.method === 'GET') {

    // get data from database
    const filePath = buildFilePath()
    const data = loadFeedback(filePath)

    res.status(200).json({
      data: JSON.stringify(data)
    })
  }
  else {
    res.status(200).json({
      message: "This Works!"
    })
  }
}

export default handler