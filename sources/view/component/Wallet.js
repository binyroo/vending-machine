(function() {

var MONEY_UNIT = [50, 100, 500, 1000];

vm.Wallet = iron.Class(iron.Dispatcher, {
	initialize: function() {
	
		iron.Dispatcher.apply(this);
		this._ownMoney = 0;
	},

	setElement: function(el) {

		this._wrap = $(el);
		this._moneyList = this._wrap.find('ul > li');
		this._ownMoneyEl = this._wrap.find('p > span');

		this._moneyList.draggable({
			helper: 'clone'
		});
	},

	getElement: function() {

		return this._wrap[0];
	},

	setTotalMoney: function(money) {
		
		this._ownMoney = money;
		this._updateOwnMoney();
	},

	spend: function(money) {

		this._ownMoney -= money;
		this._updateOwnMoney();
	},

	save: function(money) {
		
		this._ownMoney += money;
		this._updateOwnMoney();
	},

	_updateOwnMoney: function() {
		
		var ownMoney = this._ownMoney;

		this._moneyList.each(function(index, el) {
			
			var moneyUnit = MONEY_UNIT[index];
			var visible = (ownMoney >= moneyUnit);

			$(this).toggle(visible);
		});

		this._ownMoneyEl.text(this._ownMoney.toString());
	},

	setDropArea: function(el) {
		
		this._dropArea = $(el);
		this._dropArea.droppable({
			
			activeClass: 'ui-droppable-active',
			hoverClass: 'ui-droppable-over',

			tolerance: 'touch',
			
			activate: this._onActivate.bind(this),
			deactivate: this._onDeactivate.bind(this),
			drop: this._onDrop.bind(this)
		});
	},

	_onActivate: function(e, ui) {
		
		this._waitingDrop = true;
	},

	_onDrop: function(e, ui) {
		
		this.dispatch('insert_money', {
			money: MONEY_UNIT[ui.draggable.index()]
		});

		this._waitingDrop = false;
	},

	_onDeactivate: function(e, ui) {
		
		if (this._waitingDrop) {

			this.dispatch('lost_money', {
				money: MONEY_UNIT[ui.draggable.index()]
			});

			this._waitingDrop = false;
		}
	}
});

})();
