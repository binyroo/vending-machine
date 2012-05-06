jQuery(function() {

	module('MyMoney', {
		setup: function(attribute) {
			
		},

		teardown: function(attribute) {
			
		}
	});

	test('construction', function() {
		var m = new vm.MyMoney(10000);
		
		equal(m.get(), 10000);
	});

	test('spend', function() {
		
		// Given
		var m = new vm.MyMoney(10000);

		// When
		m.spend(1000);

		// Then
		equal(m.get(), 9000);
	});

	test('spend exception', function() {
		
		// Given
		var m = new vm.MyMoney(10000);

		// When
		try {

			m.spend(11000);
			ok(false);

		} catch(e) {
			
			// Then
			ok(true);
			equal(m.get(), 10000);
		};

	});

	test('gain', function() {
		
		// Given
		var m = new vm.MyMoney(10000);
		m.spend(1000);

		// When
		m.gain(1000);

		// Then
		equal(m.get(), 10000);
	});
	
});
