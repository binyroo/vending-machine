jQuery(function() {
	
	module('LostCoinCommand', {
		setup: function() {
			this.facade = puremvc.Facade.getInstance('TestFacade');

			vm.MyMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['MyMoneyProxy']);
					this._money = 10000;
				},

				spend: function(money) {
					
					this._money -= money
				},

				get: function() {
					return this._money;
				}
			});
		},

		teardown: function() {
			puremvc.Facade.removeCore('TestFacade');	
		}
	});

	test('insert coin', function() {

		// Given
		var myMoneyProxy = new vm.MyMoneyProxy();

		this.facade.registerProxy(myMoneyProxy);
		this.facade.registerCommand(vm.Const.INSERT_COIN, vm.LostCoinCommand);

		// When
		this.facade.sendNotification(vm.Const.INSERT_COIN, 1000);

		// Then
		equal(myMoneyProxy.get(), 9000);
	});


});

