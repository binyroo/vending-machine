vm.StartupCommand = iron.Class(puremvc.MacroCommand, {

	initialize: function() {
		
		puremvc.MacroCommand.call(this);
	},

	initializeMacroCommand: function() {
		this.addSubCommand(vm.PrepareProductWindowCommand);	
	}
});
