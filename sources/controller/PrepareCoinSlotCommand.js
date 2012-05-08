vm.PrepareCoinSlotCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.Proxy.apply(this);
	},

	execute: function(note) {
		
		var facade = this.facade;

		facade.registerProxy(new vm.InsertedMoneyProxy());
		facade.registerMediator(new vm.CoinSlotMediator());
	}
});

