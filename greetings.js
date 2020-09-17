module.exports = function greetings() {

    // this is an empty object that stores my names.
    var nameList = {}

    //function that set names
    function setName(name) {
        //if statement that says if the name that I entered it's not there it must be undefined
        //but my empty object must start to count it from 0.
        if (nameList[name] === undefined) {
            nameList[name] = 0;
        }

        nameList[name]++
    }

    function getNames() {
        return nameList
    }
    // if language is english 
    //it must greet with that language and name of person.
    function languages(name, language) {
        if (language == "English") {
            return "Hello, " + name;
        }
        if (language == "Afrikaans") {
            return "Halo, " + name;
        }
        else if (language == "Isixhosa") {
            return "Molo, " + name;
        }
    }


    //function for counter .
    function theCounter() {
        return Object.keys(nameList).length
    }

    // function errorFlash(name){
    //     {
    //         if (name = "")
        
    //     if (language == "English") {
    //         req.flash = "enter your name, "  + name + "";
    //     }
    //     if (language == "Afrikaans") {
    //         req.flash = "enter your name, "  + name + "";
    //     }
    //     else if (language == "Isixhosa") {
    //         req.flash = "faka igama lakho, "  + name + "";
    //     }
    // }
    // }
    

    return {
        languages,
        getNames,
        theCounter,
        setName
    }
}