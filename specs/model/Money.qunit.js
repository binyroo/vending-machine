jQuery(function() {
	test('constructor', function() {

		// Given
		// When
		var m = new vm.Money();

		// Then
		equal(m.get(), 0);
	});

	test('constructor', function() {
		
		// Given
		// When
		var m = new vm.Money(10000);

		// Then
		equal(m.get(), 10000);
	});
	
	test('set/get test', function() {
		
		// Given
		var m = new vm.Money();

		// When
		m.set(10000);

		// Then
		equal(m.get(), 10000);
	});

	test('plus', function() {
		
		// Given
		var m = new vm.Money();

		// When
		m.plus(1000);

		// Then
		equal(m.get(), 1000);

		// When
		m.plus(500);

		// Then
		equal(m.get(), 1500);
	});

	test('minus', function() {
		
		// Given
		var m = new vm.Money(1000);

		// When
		m.minus(700);

		// Then
		equal(m.get(), 300);
	});

	test('minus exception', function() {
		
		// Given
		var m = new vm.Money(10000);

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

});
