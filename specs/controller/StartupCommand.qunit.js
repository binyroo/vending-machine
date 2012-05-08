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
		var PrepareProductWindowCommand = this.getMockCommandClass('prepareProductWindow');
		vm.PrepareProductWindowCommand = PrepareProductWindowCommand;

		var PrepareWalletCommand = this.getMockCommandClass(' prepareWallet');
		vm.PrepareWalletCommand = PrepareWalletCommand;

		var PrepareCoinSlotCommand = this.getMockCommandClass(' prepareCoinSlot');
		vm.PrepareCoinSlotCommand = PrepareCoinSlotCommand;

		var command = new vm.StartupCommand();

		// When
		var notification = this.getMockNotification();
		command.execute(notification);

		// Then
		equal(notification.getBody().execMsg, 'prepareProductWindow prepareWallet prepareCoinSlot');
	});
});
