vm.MyMoney = iron.Class({

	initialize: function(money) {

		this._money = money;	
	},

	get: function() {
		return this._money;
	},

	spend: function(money) {

		var currMoney = this._money;

		this._money -= money;

		if (this._money < 0) {

			this._money = currMoney;

			throw new Error('not enough money');
		}
	},

	gain: function(money) {
		
		this._money += money;
	}
});
