jQuery(function() {
	module('vm.Wallet');

	test('set/getElement', function() {

		// Given
		var wallet = new vm.Wallet();

		// When
		var el = $('#money-view .wallet-area');
		wallet.setElement(el[0]);

		// Then
		deepEqual(wallet.getElement(), el[0]);
	});

	test('money is draggable', function() {
		
		// Given
		var wallet = new vm.Wallet();
		var el = $('#money-view .wallet-area');

		// When
		wallet.setElement(el[0]);

		// Then
		var moneyEl = el.find('ul > li');
		
		ok(moneyEl.is('.ui-draggable'));
		equal(moneyEl.draggable('option', 'helper'), 'clone');
	});

	test('setDropArea', function() {
		
		// Given
		var wallet = new vm.Wallet();
		var el = $('#money-view .wallet-area');
		wallet.setElement(el[0]);

		// When
		var dropEl = $('#money-view .input-area .input-drop');
		wallet.setDropArea(dropEl[0]);

		// Then
		ok(dropEl.is('.ui-droppable'));
	});

	test('setTotalMoney', function() {
		// Given
		var wallet = new vm.Wallet();
		var el = $('#money-view .wallet-area');
		wallet.setElement(el[0]);

		// When
		wallet.setTotalMoney(5000);
		
		// Then
		var ownEl = $('.wallet-area > p > span');
		equal(ownEl.text(), '5000');
	});

	test('spend and save', function() {
		
		// Given
		var wallet = new vm.Wallet();
		var el = $('#money-view .wallet-area');

		wallet.setElement(el[0]);
		wallet.setTotalMoney(1500);

		// When
		wallet.spend(600);

		// Then
		var ownEl = $('.wallet-area > p > span');
		equal(ownEl.text(), '900');

		var el1000Won = el.find('ul > li').eq(3);
		ok(!el1000Won.is(':visible'));

		var el500Won = el.find('ul > li').eq(2);
		ok(el500Won.is(':visible'));

		// When
		wallet.save(600);
		
		// Then
		equal(ownEl.text(), '1500');
		ok(el1000Won.is(':visible'));
		
	});

	test('insert_money event', function() {
		
		// Given
		var wallet = new vm.Wallet();
		var el = $('#money-view .wallet-area');
		var dropEl = $('#money-view .input-area .input-drop');

		wallet.setElement(el[0]);
		wallet.setDropArea(dropEl[0]);
		wallet.setTotalMoney(10000);
		
		// When
		var inserted = false;
		var lost = false;
		var dragEl = el.find('ui > li').eq(0);

		wallet.addListener('insert_money', function(e) {
			inserted = true;
		});

		wallet.addListener('lost_money', function(e) {
			lost = true;
		});

		wallet._onActivate();
		wallet._onDrop(null, { draggable: dragEl});
		wallet._onDeactivate(null, { draggable: dragEl});

		// Then
		ok(inserted);
		ok(!lost);
	});

	test('lost_money event', function() {
		
		// Given
		var wallet = new vm.Wallet();
		var el = $('#money-view .wallet-area');
		var dropEl = $('#money-view .input-area .input-drop');

		wallet.setElement(el[0]);
		wallet.setDropArea(dropEl[0]);
		wallet.setTotalMoney(10000);
		
		// When
		var inserted = false;
		var lost = false;
		var dragEl = el.find('ui > li').eq(0);

		wallet.addListener('insert_money', function(e) {
			inserted = true;
		});

		wallet.addListener('lost_money', function(e) {
			lost = true;
		});

		wallet._onActivate();
		wallet._onDeactivate(null, { draggable: dragEl});

		// Then
		ok(!inserted);
		ok(lost);
	});
});
