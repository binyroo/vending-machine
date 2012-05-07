vm.CoinSlotMediator = iron.Class(puremvc.Mediator, {

	NAME: 'CoinSlotMediator',

	initialize: function() {
		puremvc.Mediator.apply(this, [this.NAME, new vm.CoinSlot()]);
	},

	listNotificationInterests: function() {
		
		return [
			vm.Const.UPDATE_INSERTED_MONEY
		];
	},

	handleNotification: function(note) {
		
		switch (note.getName()) {

			case vm.Const.UPDATE_INSERTED_MONEY:

				var comp = this.getViewComponent();
				var money = note.getBody().insertedMoney;

				comp.update(money);

				break;
		}
	},

	onRegister: function() {
		
		var comp = this.getViewComponent();
		comp.setElement($('#money-view .input-area'));

		this.facade.registerCommand(vm.Const.RESET_COIN_SLOT, vm.ResetCoinSlotCommand);

		comp.addListener('reset_coin', this._onResetCoin.bind(this));
	},

	_onResetCoin: function(e) {
		
		this.sendNotification(vm.Const.RESET_COIN_SLOT);
	}
});

