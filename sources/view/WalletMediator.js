vm.WalletMediator = iron.Class(puremvc.Mediator, {

	NAME: 'WalletMediator',

	initialize: function() {
		puremvc.Mediator.apply(this, [this.NAME, new vm.Wallet()]);
	},

	listNotificationInterests: function() {
		return [
			vm.Const.UPDATE_MY_MONEY
		];
	},

	handleNotification: function(note) {
		
		switch (note.getName()) {
			case vm.Const.UPDATE_MY_MONEY:
				
				var money = note.getBody(),
					comp = this.getViewComponent();

				comp.update(money);

				break;
		}
	},

	onRegister: function() {
		
		var comp = this.getViewComponent();

		comp.setElement($('#money-view .wallet-area'));
		comp.setDropArea($('#money-view .input-area .input-drop'));
		comp.setTotalMoney(10000);

		comp.addListener({
			'insert_money': this._onInsertMoney.bind(this),
			'lost_money': this._onLostMoney.bind(this)
		});
		
		var facade = this.getFacade();
		facade.registerCommand(vm.Const.INSERT_COIN, vm.InsertCoinCommand);
		facade.registerCommand(vm.Const.LOST_COIN, vm.LostCoinCommand);
	},

	_onInsertMoney: function(e) {
		
		this.sendNotification(vm.Const.INSERT_COIN, e.money);
	},

	_onLostMoney: function(e) {
		this.sendNotification(vm.Const.LOST_COIN, e.money);
	}
});

