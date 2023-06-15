const mongoose = require('mongoose')
require('dotenv').config()

//reference url
//`mongodb+srv://email1calvin:${password}@clustertest01.2vxxtje.mongodb.net/phonebook?retryWrites=true&w=majority`

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then(()=>{console.log("connected")})
    .catch((error) => {
        console.log(error.message)
    })

const phoneschema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: String
})

phoneschema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Person',phoneschema)