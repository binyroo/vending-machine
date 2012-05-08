jQuery(function() {
	
	module('CoinSlotMediator', {
		setup: function() {

			vm.ResetCoinSlotCommand = iron.Class(puremvc.SimpleCommand, {
				initialize: function() {
					puremvc.SimpleCommand.apply(this, arguments);
				},

				execute: function(note) {
					
					vm.ResetCoinSlotCommand.execCount++;
				}
			});

			vm.ResetCoinSlotCommand.execCount = 0;
			
			
			vm.CoinSlot = iron.Class(iron.Dispatcher, {
				initialize: function() {
					iron.Dispatcher.apply(this, arguments);
				},

				setElement: function(el) {
					this._el = el
				},

				getElement: function() {
					return this._el;
				},

				update: function(money) {
					this._displayMoney = money;
				},

				// test method
				getDisplayMoney: function() {
					return this._displayMoney;
				}
			});
			
			this.facade = puremvc.Facade.getInstance('TestFacade');
		},

		teardown: function() {
			
			puremvc.Facade.removeCore('TestFacade');
		}
	});

	test('Mediator name is CoinSlotMediator', function() {
		
		var med = new vm.CoinSlotMediator();
		equal(med.getMediatorName(), 'CoinSlotMediator');
	});

	test('ViewComponent is CoinSlot', function() {
		
		var med = new vm.CoinSlotMediator();
		ok(med.getViewComponent() instanceof vm.CoinSlot);
	});

	test('set element onRegister', function() {
		
		// Given
		var med = new vm.CoinSlotMediator();

		// When
		this.facade.registerMediator(med);

		// Then
		var comp = med.getViewComponent();
		var el = $(comp.getElement());

		ok(el.is('.input-area'));
	});

	test('On register, ResetInsertedMoneyCommand is registered', function() {
		
		// Given
		var med = new vm.CoinSlotMediator();

		// When
		this.facade.registerMediator(med);

		// Then
		ok(this.facade.hasCommand(vm.Const.RESET_COIN_SLOT));
	});

	test('dispatch reset coin then execute ResetCoinSlotCommand', function() {
		
		// Given
		var med = new vm.CoinSlotMediator();
		var comp = med.getViewComponent();
		
		this.facade.registerMediator(med);

		// When
		comp.dispatch('return_coin');

		// Then
		equal(vm.ResetCoinSlotCommand.execCount, 1);
	});

	test('listNotificationInterests', function() {
		
		// Given
		// When
		var med = new vm.CoinSlotMediator();

		// Then
		deepEqual(med.listNotificationInterests(), [
			vm.Const.UPDATE_INSERTED_MONEY
		]);
	});

	test('handle UPDATE_INSERTED_MONEY', function() {
		
		// Given
		var med = new vm.CoinSlotMediator();
		var comp = med.getViewComponent();
		
		this.facade.registerMediator(med);

		// When
		this.facade.sendNotification(vm.Const.UPDATE_INSERTED_MONEY, 1000);

		// Then
		equal(comp.getDisplayMoney(), 1000);
	});
});
