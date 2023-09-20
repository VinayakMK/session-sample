const express = require("express");
const app = express();
const PORT = 3000;
const session = require("session");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    secret:"mysecret",
    name:"my site",
    resave:false,
    saveUninitialized:true
}))

const users = [
    {username:"Tom", password:"123"},
    {username:"Dan", password:"123"},
]

app.get('/', (req,res)=>{

    if(req.session.isAuth){
        res.redirect("/profile");
    }
    res.sendFile(__dirname + "/login.html");
});

app.post('/login', (req,res)=>{

    const {username,password} = req.body;

    const user = users.find((data) => data.username === username && data.password === password );

    if(!user){
        res.redirect("/");
    }else{
    req.session.userID = username;
    req.session.isAuth = true;

    res.sendFile(__dirname + "/profile.html")
    }

    
});

app.get('/profile', (req,res)=>{

    if(!req.session.isAuth){
        res.redirect("/");
    }  

    res.sendFile(__dirname + "/profile.html")
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});