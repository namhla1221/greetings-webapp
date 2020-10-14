const assert = require("assert");
const pg = require("pg");
const Pool = pg.Pool;
const greet = require("../greetings");

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:codex123@localhost:5432/greetings';

const pool = new Pool({
	connectionString
});

const greetings = greet(pool);

describe("The greetings", function () {

	beforeEach(async function () {

		await pool.query("delete from greet;");
	});

	it("should be able to greet Namhla in English", async function () {
		const greetings = greet(pool);
		assert.equal("Hello, Namhla", await greetings.languages("Namhla", "English"));

	})

	it("should be able to greet Sinono in Isixhosa", async function () {
		const greetings = greet(pool);
		assert.equal("Molo, Sinono", await greetings.languages("Sinono", "Isixhosa"));

	})

	it("should be able to greet Bomza in Afrikaans", async function () {
		const greetings = greet(pool);
		assert.equal("Halo, Bomza", await greetings.languages("Bomza", "Afrikaans"));

	})

	it("should be able to add names to database and get user counter", async function () {
		const  greetings = greet(pool);

		await greetings.insertName("Njunju");
		await greetings.insertName("Njunju");

		const counter = await greetings.getCount("Njunju")

    
		assert.equal(2, counter);
	})

		it("should be able to update counter ", async function(){
		const greetings =  greet(pool);

		var message = await greetings.languages("Sipho", "English" )

		assert.equal(message, "Hello, Sipho");
	})

	it("should be able to add peoples name in the database and get their counter", async function () {
		
		await greetings.insertName("Namhla");

		const counter = await greetings.getCount("Namhla");

		assert.equal(1, counter);
	})

	// 	it("should be able to reset counter and greeted name in the database to 0", async  function (){
	// 	const greetings = greeet(pool);

	// 	await greetings.
	// 	const greeted = await greetings.reset()

	// 	assert.equal()
	// })




	

	// it("should be able to store names in the database", async function () {

	// 	let greetings = greet(pool);

	// 	await greetings.insertName("Dorathy");
	// 	await greetings.insertName("Dorathy");
		

	// 	const stored = await greetings.getCount()

	// 	assert.equal({ "Dorathy": 2}, stored);
	// })

	// it("should be able to reset counter and greeted name in the database to 0", async  function (){
	// 	const greetings = greeet(pool);

	// 	await greetings.
	// 	const greeted = await greetings.reset()

	// 	assert.equal()
	// })


	after(function () {
		pool.end();
	})

});

// let assert = require("assert");
// let greet = require("../greetings");
// const pg = require("pg");
// const Pool = pg.Pool;

// const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:codex123@localhost:5432/greetings';

// const pool = new Pool({
//     connectionString
// });

// describe("The greetings", function() {

// 	beforeEach(async function (){

// 		await pool.query("delete from greet;");
// 	});

// 	it("should be able to greet Namhla in English", function(){
// 		assert.equal("Hello, Namhla")
// 	})

// 	it("should be able to update counter ", function(){
// 		let greetings = greet();
// 		var message = greetings.languages("Sipho", "English" )

// 		assert.equal(message, "Hello, Sipho");
// 	})

// 	it("should be able to insert name to greet", function(){
// 		let greetings = greet();
// 		var  message = greetings.languages("Namhla", "Afrikaans")

// 		assert.equal(message, "Halo, Namhla");
// 	})

// 	it("should be able to set name", function() {
// 		let  greetings = greet();

// 		greetings.setName("Thabo");
// 		greetings.setName("Sipho");
// 		greetings.setName("Namhla");

// 		assert.deepEqual({
// 			Namhla: 1,
// 			Sipho: 1,
// 			Thabo: 1
// 		  }
// 		  , greetings.getNames());

// 	});



// 	it("should be able count how many names have been entered", function(){
// 		let greetings = greet();

// 	    greetings.setName("Sipho");
// 	    greetings.setName("Thabo");

// 	assert.equal(2, greetings.theCounter());

// 	})

// 	after(function(){
// 		pool.end();
// 	})

// });