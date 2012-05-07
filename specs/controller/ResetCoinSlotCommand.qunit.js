jQuery(function() {
	
	module('ResetCoinSlotCommand', {
		setup: function() {
			this.facade = puremvc.Facade.getInstance('TestFacade');

			vm.InsertedMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['InsertedMoneyProxy']);
					this._money = 3000;
				},

				reset: function() {
					
					this._money = 0;
					return 3000;
				},

				get: function() {
					return this._money;
				}
			});

			vm.MyMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['MyMoneyProxy']);

					this._money = 0;
				},

				get: function() {
					return this._money;
				},

				gain: function(money) {
					this._money += money;
				}
			});
			
		},

		teardown: function() {
			puremvc.Facade.removeCore('TestFacade');	
		}
	});

	test('insert coin', function() {

		// Given
		var insertedMoney = new vm.InsertedMoneyProxy();
		var myMoney = new vm.MyMoneyProxy();

		this.facade.registerProxy(insertedMoney);
		this.facade.registerProxy(myMoney);
		this.facade.registerCommand(vm.Const.RESET_COIN_SLOT, vm.ResetCoinSlotCommand);

		// When
		this.facade.sendNotification(vm.Const.RESET_COIN_SLOT);

		// Then
		equal(insertedMoney.get(), 0);
		equal(myMoney.get(), 3000);
	});


});


