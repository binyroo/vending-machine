vm.MyMoneyProxy = iron.Class(puremvc.Proxy, {

	NAME: 'MyMoneyProxy',

	initialize: function() {
		puremvc.Proxy.apply(this, [this.NAME, new vm.MyMoney()]);
	},

	initMoney: function(money) {
		
		var vo = this.getData();
		vo.gain(money);

		this._notify();
	},

	spend: function(money) {
		
		this.getData().spend(money);
		this._notify();
	},

	gain: function(money) {
		
		this.getData().gain(money);
		this._notify();
	},

	_notify: function() {
		
		this.sendNotification(vm.Const.UPDATE_MY_MONEY, this.getData().get());
	}
});

