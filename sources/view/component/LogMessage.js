vm.LogMessage = iron.Class({

	initialize: function() {
		this._logStr = '';
	},

	setElement: function(el) {

		this._el = $(el);
	},

	getElement: function() {

		return this._el[0];
	},

	log: function(str) {
		
		if (this._logStr == '') {
			this._logStr += str;
		} else {
			this._logStr = str + '\n' + this._logStr;
		}

		this._el.text(this._logStr);
	}
});