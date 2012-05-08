jQuery(function() {
	
	module('PrepareCoinSlotCommand', {
		setup: function() {

			vm.CoinSlotMediator = iron.Class(puremvc.Mediator, {
				initialize: function() {
					puremvc.Mediator.apply(this, ['CoinSlotMediator']);
				}
			});

			vm.InsertedMoneyProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['InsertedMoneyProxy']);
				}
			});
			
			
			
		},

		teardown: function() {
			
		}
	});

	test('Prepare CoinSlot', function() {

		// Given
		var facade = puremvc.Facade.getInstance('TestFacade');

		facade.registerCommand('prepareCoinSlot', vm.PrepareCoinSlotCommand);

		// When
		facade.sendNotification('prepareCoinSlot');

		// Then
		ok(facade.hasMediator('CoinSlotMediator'));
		ok(facade.hasProxy('InsertedMoneyProxy'));
		
	});
});
