vm.ProductItemComponent = iron.Class(iron.Dispatcher, {

	initialize: function() {
		iron.Dispatcher.apply(this);
	},

	setElement: function(el) {
		this._wrap = $(el);
	},

	getElement: function() {
		return this._wrap[0];
	},

	setData: function(data) {
		
		var html = this._getHtml(data);

		this._wrap.html(html);

		if (data.stockCount <= 0) {
			this.soldout();
		}
	},

	on: function() {
		this._wrap.addClass('on');
	},

	off: function() {
		this._wrap.removeClass('on');
	},

	soldout: function() {
		this._wrap.attr('class', 'disabled');	
	},

	_getHtml: function(data) {
		
		var html = ['<div><img src="'
					, data.img
					, '" width="92" height="92" alt="'
					, data.name
					, '"></div><p><strong>'
					, data.name
					, '</strong>|<span>'
					, data.price
					, '</span>원</p>'].join('');

		return html;
	}
});
