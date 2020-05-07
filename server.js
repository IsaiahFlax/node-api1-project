const express = require('express')

const shortid = require('shortid')

const server = express()

server.use(express.json())

let hubs = []
let lessons = []

server.get('/', (req, res) => {
    res.json({message: "hello world!"})
})

server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body
    hubInfo.id = shortid.generate()
    hubs.push(hubInfo)
    res.status(201).json(hubInfo)
})

server.get('/api/hubs', (req, res) => {
    res.status(200).json(hubs)
})

server.get('/api/hubs/:id', (req, res) => {
    res.status(200).json(hubs)
})

server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    const found = hubs.find(hub => hub.id === id);
    if (found) {
        hubs = hubs.filter(hub => hub.id !== id);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "hub not found" });
    }
})

server.patch('/api/hubs/:id', (req, res)=> {
    const { id } = req.params
    const changes = req.body

    let found = hubs.find(hub => hub.id === id)
    if (found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: "hub not found"})
    }
})

server.put('/api/hubs/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    let index = hubs.findIndex(hub => hub.id === id)
    if (index !== -1) {
        changes.id = id
        hubs[index] = changes
        res.status(200).json(hubs[index])
    } else {
        res.status(404).json({ message: "hub not found"})
    }
})

server.post('/api/lessons', (req, res) => {
    const lessonInfo = req.body
    lessonInfo.id = shortid.generate()
    lessons.push(lessonInfo)
    res.status(201).json(lessonInfo)
})

server.get('/api/lessons', (req, res) => {
    res.json({message: "hello world!"})
})


server.get('/api/lessons/:id', (req, res) => {
    res.status(200).json(lessons)
})

server.patch('/api/lessons/:id', (req, res)=> {
    const { id } = req.params
    const changes = req.body

    let found = lessons.find(lesson => lesson.id === id)
    if (found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: "lesson not found"})
    }
})

server.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    const found = lessons.find(lesson => lesson.id === id);
    if (found) {
        lessons = lessons.filter(lesson => lesson.id !== id);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "lesson not found" });
    }
})



server.put('/api/hubs/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    let index = hubs.findIndex(hub => hub.id === id)
    if (index !== -1) {
        changes.id = id
        hubs[index] = changes
        res.status(200).json(hubs[index])
    } else {
        res.status(404).json({ message: "hub not found"})
    }
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})
