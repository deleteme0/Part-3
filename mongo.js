const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const in_name = process.argv[3]
const in_num = process.argv[4]

const url =
  `mongodb+srv://email1calvin:${password}@clustertest01.2vxxtje.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url).then(()=>{console.log("connected")})

const phoneschema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phoneschema)

if (in_name == undefined || in_num == undefined){
  Person.find({}).then(persons=>{
    persons.forEach((each)=>{
      console.log(each.name)
    })
    mongoose.connection.close();
  })
}

else{
const person = new Person({
  name: in_name,
  number: in_num
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
}