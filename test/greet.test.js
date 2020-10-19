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
		const greetings = greet(pool);

		await greetings.insertName("Njunju");
		await greetings.insertName("Njunju");

		const counter = await greetings.getCount("Njunju")


		assert.equal(2, counter);
	})

	it("should be able to get names", async function () {
		const greetings = greet(pool);

		await greetings.insertName("Namhla");
		await greetings.insertName("Namhla");

		var names = await greetings.getNames();

		assert.equal(names[0].name , "Namhla")
		
	})


	
	it("should be able to add peoples name in the database and get their counter", async function () {

		await greetings.insertName("Namhla");

		const counter = await greetings.getCount("Namhla");

		assert.equal(1, counter);
	})



	after(function () {
		pool.end();
	})

});
