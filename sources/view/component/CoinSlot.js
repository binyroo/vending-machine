vm.CoinSlot = iron.Class(iron.Dispatcher, {
	initialize: function() {
		iron.Dispatcher.apply(this, arguments);

		this._currentMoney = 0;
	},

	setElement: function(el) {
		this._wrap = $(el);
		this._coinEl = this._wrap.find('p.input-drop > span');
		this._returnBtn = this._wrap.find('button');

		this._returnBtn.click(this._onClickReturnBtn.bind(this));
	},

	getElement: function() {
		return this._wrap[0];
	},

	insertCoin: function(money) {
		
		this._currentMoney += money;
		this._update();
	},

	reset: function() {
		
		this._currentMoney = 0;
		this._update();
	},

	_update: function() {
		
		this._coinEl.text(this._currentMoney.toString());
	},

	_onClickReturnBtn: function(e) {
		
		this.dispatch('return_coin');
	}
});

