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
mongoose.connect(url)

const phoneschema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phoneschema)

const person = new Person({
  name: in_name,
  number: in_num
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})