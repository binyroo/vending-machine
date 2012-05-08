jQuery(function() {
	
	module('MyMoneyProxy', {
		
		setup: function() {
			
			this.facade = puremvc.Facade.getInstance('TestFacade');
		},

		teardown: function() {
			
			puremvc.Facade.removeCore('TestFacade');
		}
	});

	test('Proxy name is MyMoneyProxy', function() {
		
		var pxy = new vm.MyMoneyProxy();

		equal(pxy.getProxyName(), 'MyMoneyProxy');
	});

	test('Proxy data is MyMoney', function() {
		
		var pxy = new vm.MyMoneyProxy();

		ok(pxy.getData() instanceof vm.MyMoney);
	});

	test('initMoney', function() {
		
		// Given
		var pxy = new vm.MyMoneyProxy();
		this.facade.registerProxy(pxy);

		// When
		pxy.initMoney(10000);

		// Then
		equal(pxy.getData().get(), 10000);
	});

	test('Send update notification', function() {
		
		// Given
		var pxy = new vm.MyMoneyProxy();

		var currentMoney = 0;
		var TestCommand= iron.Class(puremvc.SimpleCommand, {
			initialize: function() {
				puremvc.SimpleCommand.apply(this);
			},

			execute: function(note) {
				currentMoney = note.getBody();
			}
		});
		
		this.facade.registerProxy(pxy);
		this.facade.registerCommand(vm.Const.UPDATE_MY_MONEY, TestCommand);

		// When
		pxy.initMoney(10000);

		// Then
		equal(currentMoney, 10000);
	});

	test('spend', function() {
		
		// Given
		var pxy = new vm.MyMoneyProxy();
		this.facade.registerProxy(pxy);
		pxy.initMoney(10000);

		// When
		pxy.spend(1000);

		// Then
		equal(pxy.getData().get(), 9000);
	});

	test('gain', function() {
		
		// Given
		var pxy = new vm.MyMoneyProxy();
		this.facade.registerProxy(pxy);
		pxy.initMoney(10000);
		pxy.spend(1000);

		// When
		pxy.gain(1000);

		// Then
		equal(pxy.getData().get(), 10000);
	});
});
