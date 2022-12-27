import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/egrocyDB" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected");
}) 

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    emailAddress: String,
    phoneNumber: Number,
    address: String
})

const User = new mongoose.model("customersignup",userSchema)
//Route
app.post("/customerLogin",(req, res)=>{
    const { emailAddress, password} = req.body
    User.findOne({ emailAddress: emailAddress}, (err, docs) => {
        if(docs){
            if(password === docs.password ) {
                res.send({
                    "type":"success",
                    "msg":" Login "
                })
            } else {
                res.send({
                    "type":"danger",
                    "msg":"Password didn't match "
                 })
            }
        } else {
            res.send({
                "type":"danger",
                "msg":"This user not signup yet "
             })
        }
    })
})
app.post("/customerSignup",(req, res)=>{
    const {firstName, lastName, password ,emailAddress,phoneNumber,address}=req.body
        User.findOne({emailAddress: emailAddress} ,(err,docs)=> {
        if(docs){
            console.log(docs)       
            res.send({
                "type":"danger",
                "msg":"User already registered "
            })
        }
        else{        
            const user = new User({
                firstName:firstName,
                lastName:lastName ,
                password:password,
                emailAddress:emailAddress,
                phoneNumber:phoneNumber,
                address:address
            }) 
            user.save(err => {
                if(err){
                    res.send(err)
                } else {
                    res.send({
                    "type":"success",
                    "msg":"Registered "
                })
                }
            })
        }
    })
    
})

app.listen(9003,()=>{
    console.log("BE started at 9003 port");
})
