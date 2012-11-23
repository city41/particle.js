describe("ui Parser", ['ui/Parser'], function(Parser) {
	it("should return empty if 'none' is specified", function() {
		var results = Parser.parse('none');

		expect(results).toEqual([]);
	});

	it('should return as many categories as given', function() {
		var results = Parser.parse('Foo,bar,baz:Buzz,boo,bee');

		expect(results.length).toBe(2);
	});

	it('should set the section titles', function() {
		var name1 = 'bagel';
		var name2 = 'donut';

		var uiString = name1 + ',foo,bar:' + name2 + ',baz,buz';

		var results = Parser.parse(uiString);

		expect(results[0].title).toBe(name1);
		expect(results[1].title).toBe(name2);
	});

	it('should not require a type to be given', function() {
		var ui = 'Section,pos';

		var results = Parser.parse(ui);

		expect(results[0].items[0]).toBe('pos');
	});

	it('should ignore the type if specified', function() {
		var ui = 'Section,pos=vector';

		var results = Parser.parse(ui);

		expect(results[0].items[0]).toBe('pos');
	});
});

