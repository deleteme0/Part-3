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

  Person.find({})
    .then(persons => {
      const foun = persons.find((each)=> each._id == i)

      if (foun){
        response.json(foun)
      }else{
        response.send("Not Found")
      }
    }
  )
})


app.delete('/api/persons/:i',(request,response) =>{
  const  i = request.params.i;
  Person.findByIdAndRemove(i).then(()=>{
    response.status(204).end()
  }).catch(error => next(error))

  //persons= persons.filter((each) => each.id != i)
  
  response.status(204).end()
})


app.put('/api/persons/:i',(request,response) => {
  const req_person = request.body;

  const new_person = {
    name: req_person.name,
    number: req_person.number
  }

  Person.findByIdAndUpdate(request.params.i,new_person,{new:true})
    .then(each =>{
      console.log(each)
    })
    .catch(error => next(error))

  response.status(204).end()
})

app.post('/api/persons',(request,response) => {
  const req_person = request.body


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
  
  Person.find({}).then(persons => {  
  response.send("<div><b><p>Phonebook has info for "+ persons.length+" people</p><p> "+d+"</p></b></div>")
}).catch(error => next(error))

})


//errorHandling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})