vm.Money = iron.Class({
	initialize: function(money) {
		
		if (typeof money == 'number') {
			this.set(money);
		} else {
			this.set(0);
		}
	},

	set: function(money) {
		this._money = money;
	},

	get: function() {
		return this._money;
	},

	plus: function(money) {
		this._money += money;	
	},

	minus: function(money) {
		
		var currMoney = this._money;

		this._money -= money;

		if (this._money < 0) {

			this._money = currMoney;
			throw new Error('not enough money');
		}
	}
});

