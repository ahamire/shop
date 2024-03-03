const express = require("express")
const app = express()
app.get('',(req,res)=>{res.send("backend")})
app.listen(5000,()=>{console.log("http://localhost:5000")})