const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greet = require("./greetings");
const flash = require("express-flash");
const session = require("express-session")
const _ = require("lodash");
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
    var name = _.capitalize(req.body.nameEntered);
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










