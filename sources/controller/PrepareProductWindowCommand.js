vm.PrepareProductWindowCommand = iron.Class(puremvc.SimpleCommand, {

	initialize: function() {
		puremvc.SimpleCommand.apply(this, arguments);
	},

	execute: function() {
		
		var proxy = new vm.ProductListProxy();
		var mediator = new vm.ProductWindowMediator();

		this.facade.registerProxy(proxy);
		this.facade.registerMediator(mediator);

		proxy.initProductList(vm.ProductProvider.get());
	}
});

