vm.PrepareWalletCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.SimpleCommand.apply(this);
	},

	execute: function(note) {
		
		var facade = this.facade,
			myMoney = new vm.MyMoneyProxy(),
			wallet = new vm.WalletMediator();

		facade.registerProxy(myMoney);
		facade.registerMediator(wallet);

		myMoney.initMoney(10000);
	}
});

