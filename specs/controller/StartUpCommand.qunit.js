jQuery(function() {
	
	module('StartUpCommand', {
		
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

	test('StartUpCommand is MacroCommand', function() {
		
		var comm = new vm.StartUpCommand();
		
		ok(comm instanceof puremvc.MacroCommand);
	});

	test('StartUpCommand exec', function() {
		

		// Given
		var PrepareProductWindowCommand = this.getMockCommandClass('prepareProductWindowCommand');
		vm.PrepareProductWindowCommand = PrepareProductWindowCommand;

		var command = new vm.StartUpCommand();

		// When
		var notification = this.getMockNotification();
		command.execute(notification);

		// Then
		equal(notification.getBody().execMsg, 'prepareProductWindowCommand');
	});
});
