jQuery(function() {
	module('ProductWindowMediator', {
		setup: function() {
			
			vm.SelectProductCommand = iron.Class(puremvc.SimpleCommand, {
				initialize: function() {
					puremvc.SimpleCommand.apply(this, arguments);
				},

				execute: function(note) {
					vm.SelectProductCommand.tempBody = note.getBody();
				}
			});
			vm.SelectProductCommand.tempBody = null;

			vm.ProductWindow = iron.Class(iron.Dispatcher, {
				initialize: function() {
					
				},

				setElement: function(el) {
					this._el = el;
				},

				getElement: function() {
					return this._el;
				},

				setList: function(list) {
					
					this._initialized = true;
				},

				updateOnMoney: function(money) {
					this._insertedMoney = money;
				},

				updateOnStock: function() {
					this._updatedStock = true;
				},

				// method for test
				initialized: function() {
					return this._initialized;
				},

				// method for test
				updatedStock: function() {
					return this._updatedStock;
				},

				// method for test
				getInsertedMoney: function() {
					return this._insertedMoney;
				}
			});


			this.facade = puremvc.Facade.getInstance('TestFacade');
			
		},

		teardown: function() {
			
			puremvc.Facade.removeCore('TestFacade');
		}
	});

	test('Mediator name is ProductWindowMediator', function() {

		var med = new vm.ProductWindowMediator();
		equal(med.getMediatorName(), 'ProductWindowMediator');
	});

	test('ViewComponent is ProductWindow', function() {
		
		var med = new vm.ProductWindowMediator();
		ok(med.getViewComponent() instanceof vm.ProductWindow);
	});

	test('set DOM onRegister', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();

		// When
		this.facade.registerMediator(med);

		// Then
		var comp = med.getViewComponent();
		var el = $(comp.getElement());

		ok(el.is('ul'));
	});

	test('SelectProductCommand is registed onRegister', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();
		
		// When
		this.facade.registerMediator(med);

		// Then
		ok(this.facade.hasCommand(vm.Const.SELECT_PRODUCT));
	});

	test('SelectProductCommand exec', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();
		this.facade.registerMediator(med);

		// When
		var comp = med.getViewComponent();
		var selectedIndex = -1;

		comp.dispatch('select_product', { selectedIndex: 0 });

		// Then
		selectedIndex = vm.SelectProductCommand.tempBody.selectedIndex;
		equal(selectedIndex, 0);
	});

	test('listNotificationInterests', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();

		// When
		// Then
		deepEqual(med.listNotificationInterests(), [
			vm.Const.INIT_PRODUCT_LIST,
			vm.Const.UPDATE_PRODUCT_LIST,
			vm.Const.UPDATE_INSERTED_MONEY
		]);
	});

	test('handle notification INIT_PRODUCT_LIST', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();
		this.facade.registerMediator(med);

		// When
		this.facade.sendNotification(vm.Const.INIT_PRODUCT_LIST, {});

		// Then
		var comp = med.getViewComponent();
		ok(comp.initialized());
	});

	test('handle notification UPDATE_PRODUCT_LIST', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();
		this.facade.registerMediator(med);
		this.facade.sendNotification(vm.Const.INIT_PRODUCT_LIST, {});

		// When
		this.facade.sendNotification(vm.Const.UPDATE_PRODUCT_LIST);

		// Then
		var comp = med.getViewComponent();
		ok(comp.updatedStock());
	});

	test('handle notification UPDATE_INSERTED_MONEY', function() {
		
		// Given
		var med = new vm.ProductWindowMediator();
		this.facade.registerMediator(med);
		this.facade.sendNotification(vm.Const.INIT_PRODUCT_LIST, {});

		// When
		this.facade.sendNotification(vm.Const.UPDATE_INSERTED_MONEY, { insertedMoney: 9000 });

		// Then
		var comp = med.getViewComponent();
		equal(comp.getInsertedMoney(), 9000);
	});
});
