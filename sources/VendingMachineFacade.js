(function() {

binyroo.VendingMachineFacade = iron.Class(puremvc.Facade, {
	
	initialize: function() {
		
		puremvc.Facade.apply(this, [ binyroo.VendingMachineFacade.NAME ]);
	},
	
	initializeController: function() {
		
		puremvc.Facade.prototype.initializeController.call(this);
		
		this.registerCommand(binyroo.VendingMachineFacade.STARTUP, binyroo.StartUpCommand);
	},
	
	startup: function() {
		
		this.sendNotification(binyroo.VendingMachineFacade.STARTUP);
	}
});

binyroo.VendingMachineFacade.getInstance = function(key) {
	
	var key = binyroo.VendingMachineFacade.NAME;
	
	if (!puremvc.Facade.hasCore(key)) {
		new binyroo.VendingMachineFacade(key);
	}
	
	return puremvc.Facade.getInstance(key);
}

binyroo.VendingMachineFacade.NAME = 'VendingMachineFacade';

binyroo.VendingMachineFacade.STARTUP = 'startup';

})();