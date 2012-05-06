jQuery(function() {
	
	module('SelectProductCommand', {
		setup: function() {
			
			vm.ProductListProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, arguments);

					this._selectedIndex = -1;
				},

				selectProduct: function(index) {
					this._selectedIndex = index;	
				},

				getSelectedIndex: function() {
					return this._selectedIndex;
				}
			});

			this.facade = puremvc.Facade.getInstance('TestFacade');

			this.facade.registerProxy(new vm.ProductListProxy('ProductListProxy'));
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
		var proxy = this.facade.retrieveProxy('ProductListProxy');
		equal(proxy.getSelectedIndex(), 0);
	});
});
