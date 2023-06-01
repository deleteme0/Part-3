const express = require('express')
const app = express()

app.use(express.json())

var morgan = require('morgan')

app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

  response.status(204).end()
})

app.get('/info',(request,response)=>{
  let d = Date(Date.now()).toString()
  console.log(d)
  
  response.send("<div><b><p>Phonebook has info for "+ persons.length+" people</p><p> "+d+"</p></b></div>")
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})