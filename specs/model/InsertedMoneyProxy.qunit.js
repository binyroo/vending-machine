jQuery(function() {
	
	module('InsertedMoney', {
		setup: function() {
			
			this.facade = puremvc.Facade.getInstance('TestFacade');
		},

		teardown: function() {
			
			puremvc.Facade.removeCore('TestFacade');
		}
	});

	test('Proxy name is InsertedMoneyProxy', function() {

		var pxy = new vm.InsertedMoneyProxy();
		equal(pxy.getProxyName(), 'InsertedMoneyProxy');
	});

	test('Proxy data is InsertedMoney', function() {
		
		var pxy = new vm.InsertedMoneyProxy();
		ok(pxy.getData() instanceof vm.InsertedMoney);
	});

	test('insert', function() {
		
		// Given
		var pxy = new vm.InsertedMoneyProxy();
		this.facade.registerProxy(pxy);

		// When
		pxy.insert(1000);

		// Then
		equal(pxy.getData().get(), 1000);
	});

	test('Notify update inserted money', function() {
		
		// Given
		var pxy = new vm.InsertedMoneyProxy();

		var insertedMoney = 0;
		var TestCommand = iron.Class(puremvc.SimpleCommand, {
			initialize: function() {
				puremvc.SimpleCommand.apply(this);
			},

			execute: function(note) {
				insertedMoney = note.getBody();
			}
		});

		this.facade.registerProxy(pxy);
		this.facade.registerCommand(vm.Const.UPDATE_INSERTED_MONEY, TestCommand);

		// When
		pxy.insert(1000);

		// Then
		equal(insertedMoney, 1000);
	});

	test('spend', function() {
		
		// Given
		var pxy = new vm.InsertedMoneyProxy();
		this.facade.registerProxy(pxy);
		pxy.insert(1000);

		// When
		pxy.spend(500);

		// Then
		equal(pxy.getData().get(), 500);
	});

	test('reset', function() {
		
		// Given
		var pxy = new vm.InsertedMoneyProxy();
		this.facade.registerProxy(pxy);
		pxy.insert(1000);

		// When
		var returnMoney = pxy.reset();

		// Then
		equal(returnMoney, 1000);
		equal(pxy.getData().get(), 0);
	});
});
