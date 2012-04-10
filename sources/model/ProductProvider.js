(function() {

var Const = {

	PRODUCT_COUNT: 8,

	PRODUCT_NAME: ["팹시", "V10", "녹차", "맹물", "환타", "식혜", "국물", "커피"],

	IMAGE_PREFIX: 'http://binyroo.github.com/VendingMachine/img/pImg',
	IMAGE_EXTENSION: '.png',
	IMAGE_ID_MAX: 22,
	IMAGE_ID_MIN: 0,

	STOCK_COUNT_MAX: 3,
	STOCK_COUNT_MIN: 1,

	PRICE_UNIT: 100,
	PRICE_MAX: 8,
	PRICE_MIN: 1

};

vm.ProductProvider = {
	get: function() {
		
		var helper = vm.DataHelper;
		var prodCnt = Const.PRODUCT_COUNT;

		var nameIndexes = helper.getRandomIntList(prodCnt);
		var imgIdList = helper.getRandomIntList(prodCnt, Const.IMAGE_ID_MIN, Const.IMAGE_ID_MAX);
		var priceList = helper.getRandomIntList(prodCnt, Const.PRICE_MIN, Const.PRICE_MAX);

		var list = [], prodVO;

		for (var i = 0; i < prodCnt; i++) {
			
			prodVO = this._getProductData(nameIndexes[i], imgIdList[i], priceList[i]);
			list.push(prodVO);
		};
		
		return list;
	},

	_getProductData: function(nameIdx, ImgId, price) {
		
		var vo = {};

		vo.name = Const.PRODUCT_NAME[nameIdx];
		vo.img = Const.IMAGE_PREFIX + this._twoDigit(ImgId) + Const.IMAGE_EXTENSION;
		vo.price = price * Const.PRICE_UNIT;
		vo.stockCount = vm.DataHelper.getRandomInt(Const.STOCK_COUNT_MIN, Const.STOCK_COUNT_MAX);

		return new vm.ProductVO(vo);
	},

	_twoDigit: function(number) {
		
		return (number >= 10) ? number.toString() : '0' + number;
	}
};

vm.DataHelper = {
	getRandomInt: function(min, max) {
		return (min + Math.floor(Math.random() * (max + 1 - min)));
	},

	getRandomIntList: function(size, min, max) {
		
		var len, list = [];

		min = (typeof min == 'number') ? min : 0;
		max = (typeof max == 'number') ? max : size - 1;

		len = max - min + 1;

		for (var i = 0; i < len; i++) {
			
			list.push(min + i);
		}

		return this._shuffle(list).slice(0, size);
	},

	_shuffle: function(arr) {
		
		return arr.sort(function(a, b) {
			return Math.random() > Math.random() ? 1 : -1;
		});
	}
};

})();
