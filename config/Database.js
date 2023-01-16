const mongoose = require("mongoose");
const {MONGO_URI}  = process.env ;

mongoose.set('strictQuery', true);

const connectToDB = () =>{
    mongoose.connect(MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
        
    } ).then( (res) =>{
         console.log("DB connection succesfull")
    } ).catch((err) =>{
        console.log(err.message)
        console.log("DB connection failed")
    })
}

module.exports = connectToDB;