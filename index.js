const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const greet = require("./greetings");
const Greet = require("./routes");
const flash = require("express-flash");
const session = require("express-session")
//first install lodash using npm -g.

const app = express();
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:codex123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

const greetings = greet(pool);

const routeInst = Greet(greetings);

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: 'views/layouts' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(flash());


app.use(express.static('public'));


// app.get("/addFlash", routeInst.flash)

app.get("/", routeInst.home)


app.post("/greetings", routeInst.nameLang)


app.get("/greeted", routeInst.getName)

app.get("/counter/:user_name", routeInst.theMessage)

app.get("/reset", routeInst.theReset )


const PORT = process.env.PORT || 3014;
app.listen(PORT, function () {
    console.log("App started at port", PORT);
})










