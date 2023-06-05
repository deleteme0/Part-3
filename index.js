const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

var morgan = require('morgan')

const Person = require('./models/person')

morgan.token('logy', (req,res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :logy'))

app.get('/api/persons', (request, response) => {

  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:i',(request,response) => {
  const i = request.params.i;

  const i_person = persons.find((each) => each.id == i)

  response.json(i_person)
})

app.delete('/api/persons/:i',(request,response) =>{
  const  i = request.params.i;

  persons= persons.filter((each) => each.id != i)


  response.status(204).end()
})

app.post('/api/persons',(request,response) => {
  const person = request.body

  try{
  const temp = persons.filter((each) => each.name == person.name)
  if (temp.length > 0){
    response.status(400)
    response.send("Name Already exists")
    return
  }

  const temp2 = persons.filter((each)=> each.number == person.number)
  if (temp2.length > 0){
    response.status(400)
    response.send("Number already exists")
    return
  }
  }
  catch{
    response.status(400)
    response.send("Invalid request")
    return
  }

  person.id = Math.floor(Math.random()*1000)

  persons = persons.concat(person)

  
  
  console.log(person)
  console.log(persons)

  response.status(204).end()
})
app.get('/info',(request,response)=>{
  let d = Date(Date.now()).toString()
  console.log(d)
  
  response.send("<div><b><p>Phonebook has info for "+ persons.length+" people</p><p> "+d+"</p></b></div>")
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})