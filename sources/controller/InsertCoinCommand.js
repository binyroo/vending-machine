vm.InsertCoinCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.SimpleCommand.apply(this);
	},

	execute: function(note) {

		var facade = this.facade;
		
		var coin = note.getBody(),
			myMoney = facade.retrieveProxy('MyMoneyProxy'),
			insertedMoney = facade.retrieveProxy('InsertedMoneyProxy');

		myMoney.spend(coin);
		insertedMoney.insert(coin);
	}
});

