jQuery(function() {
	
	module('InsertCoinCommand', {
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

			vm.InsertedMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['InsertedMoneyProxy']);
					this._money = 0;
				},

				insert: function(money) {
					this._money += money;
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
		var insertedMoneyProxy = new vm.InsertedMoneyProxy();

		this.facade.registerProxy(myMoneyProxy);
		this.facade.registerProxy(insertedMoneyProxy);

		this.facade.registerCommand(vm.Const.INSERT_COIN, vm.InsertCoinCommand);

		// When
		this.facade.sendNotification(vm.Const.INSERT_COIN, 1000);

		// Then
		equal(myMoneyProxy.get(), 9000);
		equal(insertedMoneyProxy.get(), 1000);
	});


});
