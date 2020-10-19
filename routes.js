module.exports = function routes(greetings){

    const _ = require("lodash");

    // function flash (req, res) {
    //     res.redirect("/")
    // };

    async function home (req, res) {
        res.render("index", {
    
        })
    };

    async function nameLang(req, res) {
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
    };

    async function getName(req, res) {
    
        var indiNames = await greetings.getNames()
        
        res.render("greeted", {
            name: indiNames
            
        })
    };

    async function theMessage(req, res) {
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
    };
    
    async function theReset(req, res){

        await greetings.reset()
    
        res.render('index', {
    
            counter : await greetings.getCount(),
    
        })
      
    };
    


    return {
        // flash,
        home,
        nameLang,
        getName,
        theMessage,
        theReset
    }
}