vm.ResetCoinSlotCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.SimpleCommand.apply(this);
	},

	execute: function(note) {
		
		var facade = this.facade;

		var insertedMoney = facade.retrieveProxy('InsertedMoneyProxy');
		var myMoney = facade.retrieveProxy('MyMoneyProxy');

		var returnMoney = insertedMoney.reset();
		
		myMoney.gain(returnMoney);
	}
});

