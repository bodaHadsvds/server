
const express = require("express");
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require('cors')
const app = express();

app.use(bodyParser.json())
app.use(cors())
 

const database ={
    users : [
    {
        id :  "123",
        name : 'john',
        email: 'john@gmail.com',
        password: "cookies",
        entires : "0",
        joined : new Date()
        

    }
    ,
    {
        id :  "124",
        name : 'sallu',
        email: 'sally@gmail.com',
        password: "bananaa",
        entires: "0",
        joined : new Date()
  

    }],
    login : [ {
        id :"123",
        email:"john@gmail.com",
        hash:""

    }

    ]

}
// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
   
//   app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
//   })
   

app.get("/" , (req,res )=>{
 res.send(database.users)
})

app.post("/signin" , (req,res )=>{
    
    // // // Load hash from your password DB.
    //  bcrypt.compare("anna", "$2a$10$Cqi4ZPOR68Bl4.Igyq42/.mv/EjfSIJ8KW8rYgeO8jSu23N7Yxq9G", function(err, res) {
    //    console.log("first guess",res)
    // });
    // bcrypt.compare("veggies", "$2a$10$Cqi4ZPOR68Bl4.Igyq42/.mv/EjfSIJ8KW8rYgeO8jSu23N7Yxq9G", function(err, res) {
    //     console.log("secound guess",res)
    //      });
    if(req.body.email ===database.users[0].email && req.body.password=== database.users[0].password ){
        // res.json(database.users)
      return  res.json("success")
    } else {
       return res.status(404).send("not workng")
    }
    
   })

   app.post("/register", (req,res)=>{
    const {email,name,password} = req.body
    
    bcrypt.hash(password, null, null, function(err, hash) {

      console.log(hash)
    });
    database.users.push({
                id :  "127",
                name : name,
                email: email,
                password: password,
                entires :"0" ,
                joined: new Date()
    
})
res.json(database.users[database.users.length-1])
   })
//     database.users.push({
//         id :  "127",
//         name : name,
//         email: email,
//         password: password,
//         entires :"0" 
        
        
        

//     })
   

//     res.json(database.users[database.users.length-1])
//    })
   app.get('/profile/:id',(req,res)=>{
    const {id}= req.params;
    let found =false;
    database.users.forEach(users =>{
        if (users.id=== id){
            found = true
           return res.json(users)
    } 
})
        if(!found){
            res.status(404).json("no such user ")
        }

    });

    app.post("/image",(req,res)=>{
        const {id}= req.body;
        let found = false ;
        database.users.forEach(users=>{
            if (users.id=== id){
               found=true
                users.entires++
               return res.json(users.entires)
        } 
    })
            if(!found){
                res.status(404).json("no such user ")
            }
    })

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    // });
    
    // // Load hash from your password DB.
    // bcrypt.compare("bacon", hash, function(err, res) {
    //     // res == true
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //     // res = false
    // });

app.listen(3000, ()=>{
    console.log("app is running on port 3000")
})

/*
/--> res = this is working 
/    sign in --> post = sucess/fail
     register --> post = user
/    profile/:userId -->GET = User
/    هimage /: put ---> user

*/