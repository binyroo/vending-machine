jQuery(function() {
	
	module('StartupCommand', {
		
		setup: function() {

			this.getMockNotification = function() {
				
				var vo = {};

				vo.execMsg = '';

				return new puremvc.Notification('', vo);
			};
			
			this.getMockCommandClass = function(msg) {
				
				var Class = iron.Class(puremvc.SimpleCommand, {
					execute: function(note) {
						
						var vo = note.getBody();

						vo.execMsg += msg;
					}
				});

				return Class;
			};
		}
	});

	test('StartupCommand is MacroCommand', function() {
		
		var comm = new vm.StartupCommand();
		
		ok(comm instanceof puremvc.MacroCommand);
	});

	test('StartupCommand exec', function() {
		

		// Given
		var PrepareProductWindowCommand = this.getMockCommandClass('prepareProductWindowCommand');
		vm.PrepareProductWindowCommand = PrepareProductWindowCommand;

		var command = new vm.StartupCommand();

		// When
		var notification = this.getMockNotification();
		command.execute(notification);

		// Then
		equal(notification.getBody().execMsg, 'prepareProductWindowCommand');
	});
});
