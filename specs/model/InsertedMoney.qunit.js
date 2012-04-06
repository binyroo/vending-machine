jQuery(function() {
	module('vm.InsertedMoney', {
		setup: function() {
			
		},

		teardown: function() {
			
		}
	});

	test('init money test', function() {
		
		// Given
		// When
		var m = new vm.InsertedMoney();

		// Then
		equal(m.get(), 0);
	});

	test('insert', function() {
		
		// Given
		var m = new vm.InsertedMoney();

		// When
		m.insert(1000);

		// Then
		equal(m.get(), 1000);

		// When
		m.insert(500);

		// Then
		equal(m.get(), 1500);
	});

	test('spend', function() {
		
		// Given
		var m = new vm.InsertedMoney();
		m.insert(1000);

		// When
		m.spend(700);

		// Then
		equal(m.get(), 300);
	});

	test('spend exception', function() {
		// Given
		var m = new vm.InsertedMoney();
		m.insert(300);

		// When
		try {

			m.spend(700);
			ok(false);

		} catch(e) {
			
			// Then
			ok(e);
			equal(m.get(), 300);
		}
	});

	test('reset', function() {
		
		// Given
		var m = new vm.InsertedMoney();
		m.insert(300);
		
		// When
		m.reset();

		// Then
		equal(m.get(), 0);
	});
});
