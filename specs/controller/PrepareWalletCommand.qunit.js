jQuery(function() {
	
	module('PrepareWalletCommand', {
		setup: function() {
			
			vm.WalletMediator = iron.Class(puremvc.Mediator, {
				initialize: function() {
					puremvc.Mediator.apply(this, ['WalletMediator']);
				}
			});

			vm.MyMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['MyMoneyProxy']);
				},

				initMoney: function(money) {
					this._money = money;
				},

				// Method for Test
				initialized: function() {
					return this._money === 10000;
				}
			});
			
			
		},

		teardown: function() {
			
		}
	});

	test('Prepare Wallet', function() {
		
		// Given
		var facade = puremvc.Facade.getInstance('TestFacade');
		facade.registerCommand('prepareWallet', vm.PrepareWalletCommand);

		// When
		facade.sendNotification('prepareWallet');

		// Then
		var myMoney = facade.retrieveProxy('MyMoneyProxy');
		var wallet = facade.retrieveMediator('WalletMediator');
		
		ok(myMoney instanceof vm.MyMoneyProxy);
		ok(wallet instanceof vm.WalletMediator);
		ok(myMoney.initialized());
	});
});
