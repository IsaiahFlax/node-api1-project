const express = require('express')

const shortid = require('shortid')

const server = express()

server.use(express.json())

let users = []

server.get('/', (req, res) => {
    res.json({message: "hello world!"})
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body
    if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
        errorMessage:
          'Please provide name and bio for the user.',
      })
} else {
    userInfo.id = shortid.generate()
    users.push(userInfo)
    res.status(201).json(userInfo)
}
}).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the user to the database"
})


server.get('/api/users', (req, res) => {
    res.status(200).json(users)
}).catch(err => {
    res.status(500).json({
        errorMessage: 'The users information could not be retrieved'
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    const found = users.find((user) => user.id === id)
  
    if (found) {
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  }).catch(err => {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  });


server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const found = users.find(user => user.id === id);
    if (found) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "user not found" });
    }
}).catch(err => {
    res
      .status(500)
      .json({ errorMessage: "The user could not be removed" });
  });

server.patch('/api/users/:id', (req, res)=> {
    const { id } = req.params
    const changes = req.body

    let found = users.find(user => user.id === id)
    if (found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: "user not found"})
    }
})



const PORT = 5000

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})
