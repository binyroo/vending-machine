vm.InsertedMoney = iron.Class({
	initialize: function(money) {
		
		this._money = new vm.Money(money);
	},

	get: function() {
		return this._money.get();
	},

	insert: function(money) {
		this._money.plus(money);
	},

	spend: function(money) {
		this._money.minus(money);
	},

	reset: function() {
		this._money.set(0); 	
	}
});

