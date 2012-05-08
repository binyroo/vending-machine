vm.InsertedMoneyProxy = iron.Class(puremvc.Proxy, {
	initialize: function() {
		puremvc.Proxy.apply(this, ['InsertedMoneyProxy', new vm.InsertedMoney()]);
	},

	insert: function(money) {
		
		this.getData().insert(money);
		this._notify();
	},

	spend: function(money) {
		
		this.getData().spend(money);
		this._notify();
	},

	reset: function() {
		
		var vo = this.getData();

		var returnMoney = vo.get();
		vo.reset();

		this._notify();

		return returnMoney;
	},

	_notify: function() {
		
		this.sendNotification(vm.Const.UPDATE_INSERTED_MONEY, this.getData().get());
	}
});

