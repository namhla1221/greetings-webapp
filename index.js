const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greet = require("./greetings");
const flash = require("express-flash");
const session = require("express-session")
const app = express();
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:codex123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

const greetings = greet(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: 'views/layouts' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(flash());


app.use(express.static('public'));


app.get("/addFlash", function (req, res) {
    res.redirect("/")
});

app.get("/", async function (req, res) {
    res.render("index", {

    })
});


app.post("/greetings", async function (req, res) {
    var name = req.body.nameEntered;
    var lang = req.body.language;

    if (lang === undefined && name=== "") {
        req.flash('error', "Please enter language and name.")
        res.render('index');
        return;
    }

    else if (!name) {
        req.flash('error', "Please enter name.")
        res.render('index');
        return;
    }

    else if (!lang) {
        req.flash('error', "Please enter language.")
        res.render('index');
        return;
    }

    
    // await greetings.insertName(name)

    console.log(await greetings.getCount())
    res.render('index', {
        message: await greetings.languages(name, lang),
        counter: await greetings.getCount(),

    })
});


app.get("/greeted", async function (req, res) {
    
    var indiNames = await greetings.getNames()
    
    res.render("greeted", {
        name: indiNames
        
    })
});

app.get("/counter/:user_name", async function (req, res) {
    var theName = {}
    let username = req.params.user_name;
    let name = await greetings.getNames();
  for(var i = 0;i < name.length; i++)
      
  if(theName[name[i].name] === undefined){
      theName[name[i].name] = name[i].counter;
  }

  let msg = "Hi, " + username + ' you have greeted ' + theName[username ] + " " + 'times.' ;

  
    res.render("person", {
        
        message : msg
    })
});

app.get("/reset", async function (req, res){

    await greetings.reset()

    res.render('index', {

        counter : await greetings.getCount(),

    })
  
});



const PORT = process.env.PORT || 3014;
app.listen(PORT, function () {
    console.log("App started at port", PORT);
})










//Flash messages are used to provide a quick feedback 
//to confirm a setting has been updated) to the user.

//Tables are database objects that contain all the data in a database. 
//In tables, data is logically organized in a row-and-column

//each employee and columns representing employee information such as employee number, name, address

//route for greeted , this route will greet people and start to calculate how many times I greeted that person .
// app.get("/greeted", function (req, res) {
//     var greetedNames = greetings.getNames();
//     var counter = greetings.theCounter()
//     res.render("greeted", {
//         list: greetedNames,
//         count: counter
//     })
// });

// //It's getting counter for each person greeted
// app.get("/counter/:user_name", function (req, res) {
//     //I got two objects for username and name .
//     let username = req.params.user_name;

//     let names = greetings.getNames();
//     console.log(names)
//     //I got variable that will give me message .
//     //like it will greet with name of person + message and the counter like how many times I greeted that person.
//     var personsMsg = "Hi, " + username + ' you have greeted ' + names[username];

//     res.render("person", {
//         message: personsMsg,
//         username
//     })
// });

// if(name === ""){
// msg = req.flash('info','fdfdfdfdfdfd')
// }
//flash - is used to store message
//session- is used to save data
//Session data is stored server-side.
