jQuery(function() {

	module('LogMessage', {

		setup: function() {

		},

		teardown: function() {

		}
	});

	test('setElement, getElement', function() {
		
		// Given
		var el = $('#log');
		var logMessage = new vm.LogMessage();

		// When
		logMessage.setElement(el[0]);

		// Then
		ok(logMessage.getElement() === el[0]);
	});

	test('log', function() {
		// Given
		var el = $('#log');
		var logMessage = new vm.LogMessage();
		logMessage.setElement(el[0]);

		// When
		logMessage.log('hello');
		logMessage.log('world');

		// Then
		equal(el.text(), 'world\nhello');
	});

});