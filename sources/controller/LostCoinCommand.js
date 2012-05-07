vm.LostCoinCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.SimpleCommand.apply(this);
	},

	execute: function(note) {

		var facade = this.facade;
		
		var coin = note.getBody(),
			myMoney = facade.retrieveProxy('MyMoneyProxy');

		myMoney.spend(coin);
	}
});


