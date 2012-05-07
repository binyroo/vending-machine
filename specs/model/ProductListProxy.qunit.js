jQuery(function() {
	
	module('ProductListProxy', {
		
		setup: function() {
			
			this.facade = puremvc.Facade.getInstance('TestFacade');
		},

		teardown: function() {
			puremvc.Facade.removeCore('TestFacade');
		}
	});

	test('initProductList', function() {

		// Given
		var proxy = new vm.ProductListProxy();
		var productList = vm.ProductProvider.get();

		var initializedList = null;
		var Command = iron.Class(puremvc.SimpleCommand, {
			initialize: function() {
				puremvc.SimpleCommand.apply(this, arguments);
			},
			execute: function(note) {
				initializedList = note.getBody();
			}
		});

		this.facade.registerProxy(proxy);
		this.facade.registerCommand(vm.Const.INIT_PRODUCT_LIST, Command);

		// When
		proxy.initProductList(productList);

		// Then
		equal(productList, initializedList);
		
	});

	test('getPriceAt', function() {
		
		// Given
		var proxy = new vm.ProductListProxy();
		var productList = vm.ProductProvider.get();

		this.facade.registerProxy(proxy);
		proxy.initProductList(productList);

		var product = productList[0];

		// When
		var expectPrice = proxy.getPriceAt(0);

		// Then
		equal(expectPrice, product.getPrice());
	});

	test('sellProduct', function() {
		
		// Given
		var proxy = new vm.ProductListProxy();
		var productList = vm.ProductProvider.get();

		this.facade.registerProxy(proxy);
		proxy.initProductList(productList);

		var product = productList[0];
		var currentStockCount = product.getStockCount();

		// When
		proxy.sellProduct(0);

		// Then
		equal(product.getStockCount(), currentStockCount - 1);
	});
});
