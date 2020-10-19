module.exports = function greetings(pool) {

    async function nameCheck(names) {
        var check = await pool.query('select name from greet where name=$1', [names]);
        return check;
    }

    async function countUpdate(count) {
        var update = await pool.query('update greet set counter=counter+1 where Name=$1', [count]);
        return update;
    }

    async function insertName(name) {
        var insert = await pool.query('insert into greet(name, counter) values ($1, $2)', [name, 1]);
        return insert;

    }

    async function getCount() {
        let names = await pool.query('select * from greet')
        return names.rowCount;
    }

    async function languages(name, language) {
        var names = await nameCheck(name);
        if (names.rowCount > 0) {
            await countUpdate(name)
        } else {
            await insertName(name);
        }


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

    async function getNames() {

        var names = await pool.query('select * from greet');
        return names.rows;
    }

    async function reset(){

     await pool.query('delete from greet');
    
    }
    

    return {
        insertName,
        getCount,
        languages,
        getNames,
        nameCheck,
        countUpdate,
        reset

    }
}

