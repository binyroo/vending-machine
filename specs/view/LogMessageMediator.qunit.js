jQuery(function() {

	module('LogMessageMediator', {

		setup: function() {

			vm.LogMessage = iron.Class({

				initialize: function() {

					this._log = ''
				},

				log: function(str) {

					this._log = str;
				},

				// method for test
				getLog: function() {

					return this._log;
				}
			});
		},

		teardown: function() {

		}
	});

	test('Mediator name is LogMessageMediator', function() {

		var med = new vm.LogMessageMediator();

		equal(med.getMediatorName(), 'LogMessageMediator');
	});

	test('ViewComponent is LogMessage', function() {

		var med = new vm.LogMessageMediator();

		ok(med.getViewComponent() instanceof vm.LogMessage);
	});
});