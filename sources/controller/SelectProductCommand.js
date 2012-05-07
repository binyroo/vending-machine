vm.SelectProductCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.SimpleCommand.apply(this, arguments);
	},

	execute: function(note) {
		
		var selectedIndex = note.getBody().selectedIndex;
		var prodList = this.facade.retrieveProxy('ProductListProxy');
		var insertedMoney = this.facade.retrieveProxy('InsertedMoneyProxy');

		prodList.sellProduct(selectedIndex);

		insertedMoney.spend(prodList.getPriceAt(selectedIndex));
	}
});

