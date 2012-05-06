vm.SelectProductCommand = iron.Class(puremvc.SimpleCommand, {
	initialize: function() {
		puremvc.SimpleCommand.apply(this, arguments);
	},

	execute: function(note) {
		
		var selectedIndex = note.getBody().selectedIndex;
		var proxy = this.facade.retrieveProxy('ProductListProxy');

		proxy.selectProduct(selectedIndex);
	}
});

