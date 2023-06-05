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

  const persons = Person.find({})

  const i_person = persons.find((each) => each.id == i)

  response.json(i_person)
})

app.delete('/api/persons/:i',(request,response) =>{
  const  i = request.params.i;
  const persons = Person.find({})


  //persons= persons.filter((each) => each.id != i)

  
  response.status(204).end()
})

app.post('/api/persons',(request,response) => {
  const req_person = request.body

  const persons = Person.find({})

  const person = new Person({
    name: req_person.name,
    number: req_person.number
  })

  person.save().then(result =>{
    console.log(result)
  })


  response.status(204).end()
})
app.get('/info',(request,response)=>{
  let d = Date(Date.now()).toString()
  
  response.send("<div><b><p>Phonebook has info for "+ persons.length+" people</p><p> "+d+"</p></b></div>")
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})