jQuery(function() {
	
	module('vm.CoinSlot');

	test('set/getElement', function() {
		
		// Given
		var slot = new vm.CoinSlot();

		// When
		var el = $('#money-view .input-area')[0];
		slot.setElement(el);

		// Then
		deepEqual(slot.getElement(), el);
	});

	test('update', function() {
		
		// Given
		var slot = new vm.CoinSlot();
		var el = $('#money-view .input-area');
		slot.setElement(el[0]);

		// When
		slot.update(1000);

		// Then
		var coinEl = el.find('p.input-drop > span');
		equal(coinEl.text(), '1000');
	});

	test('insertCoin', function() {
		
		// Given
		var slot = new vm.CoinSlot();
		var el = $('#money-view .input-area');
		slot.setElement(el[0]);

		// When
		slot.insertCoin(1000);

		// Then
		var coinEl = el.find('p.input-drop > span');
		equal(coinEl.text(), '1000');

		// When
		slot.insertCoin(500);

		// Then
		equal(coinEl.text(), '1500');
	});

	test('reset', function() {
		
		// Given
		var slot = new vm.CoinSlot();
		var el = $('#money-view .input-area');
		slot.setElement(el[0]);
		slot.insertCoin(1000);
		
		// When
		slot.reset();

		// Then
		var coinEl = el.find('p.input-drop > span');
		equal(coinEl.text(), '0');
	});

	test('click return button', function() {
		
		// Given
		var slot = new vm.CoinSlot();
		var el = $('#money-view .input-area');
		slot.setElement(el[0]);

		// When
		var clicked = false;
		var btn = el.find('button');
		slot.addListener('return_coin', function() {
			clicked = true;
		});
		
		btn.click();

		// Then
		ok(clicked);
	});
});
