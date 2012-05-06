jQuery(function() {
	module('PrepareProductWindowCommand', {
		setup: function() {

			vm.ProductProvider = {
				get: function() {
					return [];
				}
			};
			
			vm.ProductListProxy = iron.Class(puremvc.Proxy, {
				initialize: function() {
					puremvc.Proxy.apply(this, ['ProductListProxy']);
				},

				initProductList: function(list) {
					
					this.setData(list);
					this.sendNotification(vm.Const.INIT_PRODUCT_LIST, this.getData());

					this._initialized = true;
				},

				initialized: function() {
					return this._initialized;
				}
			});

			vm.ProductWindowMediator = iron.Class(puremvc.Mediator, {
				initialize: function() {
					puremvc.Mediator.apply(this, ['ProductWindowMediator']);
				},

				
				listNotificationInterests: function() {
					return [
						vm.Const.INIT_PRODUCT_LIST,
						vm.Const.UPDATE_PRODUCT_LIST
					];
				},

				handleNotification: function(note) {
					
					switch (note.getName()) {

						case vm.Const.INIT_PRODUCT_LIST:

							this._initialized = true;
							break;
					}
				},

				initialized: function() {
					return this._initialized;
				}
			});
		},

		teardown: function() {
			
		}
	});

	test('execute', function() {
		
		// Given
		var facade = puremvc.Facade.getInstance('TestFacade');
		facade.registerCommand('prepareProductWindow', vm.PrepareProductWindowCommand);

		// When
		facade.sendNotification('prepareProductWindow');

		// Then
		var proxy = facade.retrieveProxy('ProductListProxy');
		var mediator = facade.retrieveMediator('ProductWindowMediator');

		ok(proxy.initialized());
		ok(mediator.initialized());
	});
});
