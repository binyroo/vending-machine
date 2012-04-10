vm.MyMoney = iron.Class({

	initialize: function(money) {

		this._money = new vm.Money(money);
	},

	get: function() {
		return this._money.get();
	},

	spend: function(money) {
		this._money.minus(money);
	},

	gain: function(money) {
		this._money.plus(money);	
	}
});
