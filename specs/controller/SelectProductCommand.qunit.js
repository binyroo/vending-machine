jQuery(function() {
	
	module('SelectProductCommand', {
		setup: function() {
			
			vm.ProductListProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['ProductListProxy']);

					this._selectedIndex = -1;
				},

				sellProduct: function(index) {
					this._soldIndex = index;	
				},

				getPriceAt: function(index) {
					return 1000;
				},
				
				// for test method
				soldProductIndex: function() {
					return this._soldIndex;
				}
			});

			vm.InsertedMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['InsertedMoneyProxy']);
					this._money = 2000;
				},

				get: function() {
					return this._money;
				},

				spend: function(money) {
					this._money -= money;
				}
			});
			

			this.facade = puremvc.Facade.getInstance('TestFacade');

			this.facade.registerProxy(new vm.ProductListProxy());
			this.facade.registerProxy(new vm.InsertedMoneyProxy());
			this.facade.registerCommand(vm.Const.SELECT_PRODUCT, vm.SelectProductCommand);
		},

		teardown: function() {
			
		}
	});

	test('execute', function() {
		
		// Given
		// When
		this.facade.sendNotification(vm.Const.SELECT_PRODUCT, { selectedIndex: 0 });
		
		// Then
		var prodList = this.facade.retrieveProxy('ProductListProxy');
		var insertedMoney = this.facade.retrieveProxy('InsertedMoneyProxy');

		equal(prodList.soldProductIndex(), 0);
		equal(insertedMoney.get(), 1000);
	});
});
