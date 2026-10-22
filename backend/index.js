const connectTomongo = require('./db');
const express = require('express'); //Express library ko import kiya.
const cors = require('cors');
connectTomongo();

const app = express(); //Ye Express application/server ka instance bana raha hai.
const port = 400;
// CORS configuration
//Browser ke liye ye dono alag origins hain. Isliye browser backend se poochta hai ki kya ye frontend request bhej sakta hai?
// Backend ko permission dene ke liye CORS configure karte hain.

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })

app.use(express.json()); //"Express, agar request ke andar JSON data aaye, to us JSON ko read karke req.body mein available kar dena."

app.use('/api/auth', require('./routes/auth')) //"Jab /api/auth se related request aaye, uska kaam ./routes/auth wali file ko de dena."


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
}) //Iska kaam hai:Express server ko actually start karna.


// app.use() = request ko kahan bhejna hai
// app.listen() = server ko kis port par start karna hai