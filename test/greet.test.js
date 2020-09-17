let assert = require("assert");
let greet = require("../greetings");


describe("The greetings factory function", function() {

	it("should be able to greet a person in Isixhosa", function(){
		let greetings = greet();
		var message = greetings.languages( "Thabo","Isixhosa")

		assert.equal (message, "Molo, Thabo");
	})

	it("should be able to greet a person in English", function(){
		let greetings = greet();
		var message = greetings.languages("Sipho", "English" )

		assert.equal(message, "Hello, Sipho");
	})

	it("should be able to greet a person in Afrikaans", function(){
		let greetings = greet();
		var  message = greetings.languages("Namhla", "Afrikaans")

		assert.equal(message, "Halo, Namhla");
	})

	it("should be able to set name", function() {
		let  greetings = greet();
		
		greetings.setName("Thabo");
		greetings.setName("Sipho");
		greetings.setName("Namhla");
		
		assert.deepEqual({
			Namhla: 1,
			Sipho: 1,
			Thabo: 1
		  }
		  , greetings.getNames());

	});



	it("should be able count how many names have been entered", function(){
		let greetings = greet();

	    greetings.setName("Sipho");
	    greetings.setName("Thabo");

	assert.equal(2, greetings.theCounter());

	})

});