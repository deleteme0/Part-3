const express = require('express')
const app = express()

<<<<<<< HEAD
app.use(express.json())

var morgan = require('morgan')

app.use(morgan('tiny'))

=======
>>>>>>> parent of 4531165 (Merge branch 'main' of https://github.com/deleteme0/Part-3)
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

app.get('/info',(request,response)=>{
  let d = Date(Date.now()).toString()
  console.log(d)
  
  response.send("<div><b><p>Phonebook has info for "+ persons.length+" people</p><p> "+d+"</p></b></div>")
})

app.get('/api/persons/:i',(request,response)=>{
  const id = Number(request.params.i)

  const person = persons.find((each)=> each.id === id)

  if (person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})