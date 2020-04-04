const fs = require("fs")
const express = require("express")
const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')
app.set('views', "public")

app.get('/post', (req, res) => {
  if(!req.query.content){
    console.log("There was an error.")
  } else {
    const data = req.query.content;
    const loadPosts = fs.readFileSync('posts.json')
    const jsData = JSON.parse(loadPosts)
    jsData.push({
      post: data
    })
    const toJson = JSON.stringify(jsData)
    fs.writeFileSync('posts.json', toJson)
    res.send({
      recentPost: data
    })
  }
  
})

app.get('/cleardata', (req, res) => {
  fs.writeFileSync('posts.json', '[]')
  res.render('index.hbs')
})

app.get('/reload', (req, res) => {
  const posts = fs.readFileSync('posts.json')
  const allPosts = JSON.parse(posts)
  res.send(allPosts)
})

app.get('/', (req, res) => {
  res.render('index.hbs')
  fs.watchFile('posts.json', (curr, prev) => {
    console.log("File Change Detected.")

    console.log("Location Changed.")
  })
})

app.listen(3000, () => {
  console.log("Server is up on 3000!")
})