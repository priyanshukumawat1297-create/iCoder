const mongoose = require('mongoose');  //"Mujhe mongoose library chahiye, jo MongoDB ke saath kaam karne mein help karegi."Tu backend mein MongoDB use kar raha hai.

const mongoURI = "mongodb://localhost:27019";

const connectTomongo = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27019/bootstrap");
        console.log("Connected to mongo succesfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectTomongo;