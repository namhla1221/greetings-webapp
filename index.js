const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greet = require("./greetings");
const flash = require("express-flash");
const session = require("express-session")
const app = express();



const greetings = greet();


app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: 'views/layouts' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




//flash - is used to store message
//session- is used to save data
//Session data is stored server-side.
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Flash
app.use(flash());


app.use(express.static('public'));


app.get("/addFlash", function(req, res){
    res.redirect("/")
});

app.get("/", function (req, res) {

  
    res.render("index", {
        counter: greetings.theCounter(),
    })
});


app.post("/greetings", function (req, res) {
    var name = req.body.nameEntered;
    var lang = req.body.language;
   
    // if(name === ""){
    // msg = req.flash('info','fdfdfdfdfdfd')
    // }

    //Flash messages are used to provide a quick feedback 
    //to confirm a setting has been updated) to the user.
    if (name === '') {
        req.flash('error', "Please enter username")
    }
    
    else{
     greetings.setName(name);

    res.render('index', {
        message: greetings.languages(name, lang),
        counter: greetings.theCounter(),
        
    })
    }
});

//route for greeted , this route will greet people and start to calculate how many times I greeted that person .
app.get("/greeted", function (req, res) {
    var greetedNames = greetings.getNames();
    var counter = greetings.theCounter()
    res.render("greeted", {
        list: greetedNames,
        count: counter
    })
});

//It's getting counter for each person greeted
app.get("/counter/:user_name", function (req, res) {
    //I got two objects for username and name .
    let username = req.params.user_name;

    let names = greetings.getNames();
    console.log(names)
    //I got variable that will give me message .
    //like it will greet with name of person + message and the counter like how many times I greeted that person.
    var personsMsg = "Hi, " + username + ' you have greeted ' + names[username];

    res.render("person", {
        message: personsMsg,
        username
    })
});


const PORT = process.env.PORT || 3014;
app.listen(PORT, function () {
    console.log("App started at port", PORT);
})

