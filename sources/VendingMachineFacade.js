(function() {

vm.VendingMachineFacade = iron.Class(puremvc.Facade, {
	
	initialize: function() {
		
		puremvc.Facade.apply(this, [ vm.VendingMachineFacade.NAME ]);
	},
	
	initializeController: function() {
		
		puremvc.Facade.prototype.initializeController.call(this);
		
		this.registerCommand(vm.VendingMachineFacade.STARTUP, vm.StartupCommand);
	},
	
	startup: function() {
		
		this.sendNotification(vm.VendingMachineFacade.STARTUP);
	}
});

vm.VendingMachineFacade.getInstance = function(key) {
	
	var key = vm.VendingMachineFacade.NAME;
	
	if (!puremvc.Facade.hasCore(key)) {
		new vm.VendingMachineFacade(key);
	}
	
	return puremvc.Facade.getInstance(key);
}

vm.VendingMachineFacade.NAME = 'VendingMachineFacade';
vm.VendingMachineFacade.STARTUP = 'startup';

})();
