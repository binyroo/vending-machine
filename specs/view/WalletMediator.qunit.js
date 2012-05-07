jQuery(function() {
	
	module('WalletMediator', {
		setup: function() {
			
			vm.Wallet = iron.Class(iron.Dispatcher, {
				initialize: function() {
					iron.Dispatcher.apply(this, arguments);
				},

				initialized: function() {
					return this._el.is('.wallet-area')
						&& this._dropEl.is('.input-drop')
						&& this._money > 0;
				},

				setElement: function(el) {
					this._el = $(el);
				},

				setDropArea: function(el) {
					this._dropEl = $(el);
				},

				setTotalMoney: function(money) {
					this._money = money;
				},

				update: function(money) {
					this._money = money;
				},

				getOwnMoney: function() {
					return this._money;
				}
			});

			this.facade = puremvc.Facade.getInstance('TestFacade');
			
		},

		teardown: function() {
			puremvc.Facade.removeCore('TestFacade');
		}
	});


	test('Mediator name is WalletMediator', function() {
		
		var med = new vm.WalletMediator();
		equal(med.getMediatorName(), 'WalletMediator');
	});

	test('ViewComponent is Wallet', function() {
		
		// Given
		// When
		var med = new vm.WalletMediator();

		// Then
		var comp = med.getViewComponent();
		ok(comp instanceof vm.Wallet);
	});

	test('On register, ViewComponent is initialized', function() {
		
		// Given
		var med = new vm.WalletMediator();

		// When
		this.facade.registerMediator(med);

		// Then
		var comp = med.getViewComponent();
		ok(comp.initialized());
	});

	test('Insert coin', function() {
		
		// Given
		var med = new vm.WalletMediator();

		var insertedMoney = 0;
		vm.InsertCoinCommand = iron.Class(puremvc.SimpleCommand, {
			initialize: function() {
				puremvc.SimpleCommand.apply(this, arguments);
			},

			execute: function(note) {
				insertedMoney = note.getBody();
			}
		});

		this.facade.registerMediator(med);

		// When
		var comp = med.getViewComponent();
		comp.dispatch('insert_money', { money: 1000 });

		// Then
		equal(insertedMoney, 1000);
	});

	test('Lost coin', function() {
		
		// Given
		var med = new vm.WalletMediator();

		var lostMoney = 0;
		vm.LostCoinCommand = iron.Class(puremvc.SimpleCommand, {
			initialize: function() {
				puremvc.SimpleCommand.apply(this, arguments);
			},

			execute: function(note) {
				lostMoney = note.getBody();
			}
		});

		this.facade.registerMediator(med);

		// When
		var comp = med.getViewComponent();
		comp.dispatch('lost_money', { money: 1000 });

		// Then
		equal(lostMoney, 1000);
	});

	test('listNotificationInterests', function() {
		
		// Given
		// When
		var med = new vm.WalletMediator();

		// Then
		deepEqual(med.listNotificationInterests(), [
			vm.Const.UPDATE_MY_MONEY
		]);
	});

	test('Handle Notification UPDATE_MY_MONEY', function() {
		
		// Given
		var med = new vm.WalletMediator();
		this.facade.registerMediator(med);

		// When
		this.facade.sendNotification(vm.Const.UPDATE_MY_MONEY, 5000);

		// Then
		var comp = med.getViewComponent();
		equal(comp.getOwnMoney(), 5000);
	});
});
