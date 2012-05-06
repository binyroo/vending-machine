jQuery(function() {
	module('vm.ProductVO', {
		setup: function() {

			this.MOCK_DATA = {
				name: '콜라',
				img: 'img/pImg00.png',
				price: 100,
				stockCount: 3
			};
		}
	});

	test('get method test', function() {
		// Given
		// When
		var vo = new vm.ProductVO(this.MOCK_DATA);
		
		// Then
		equal(vo.getName(), '콜라');
		equal(vo.getImg(), 'img/pImg00.png');
		equal(vo.getPrice(), 100);
		equal(vo.getStockCount(), 3);
	});

	test('set method test', function() {
		// Given
		var MOCK_DATA = this.MOCK_DATA;
		var vo = new vm.ProductVO();

		// When
		vo.set(MOCK_DATA);

		// Then
		deepEqual(vo.get(), MOCK_DATA);
	});

	test('sell test', function() {
		// Given
		var vo = new vm.ProductVO(this.MOCK_DATA);

		// When
		var currentStockCount = vo.sell();

		// Then
		equal(currentStockCount, 2);
		equal(vo.getStockCount(), 2);
	});

	test('sell exception test', function() {
		// Given
		var vo = new vm.ProductVO();

		// When
		var currentStockCount = vo.sell();

		// Then
		equal(currentStockCount, -1);
	});

	test('not sell test', function() {
		// Given
		var vo = new vm.ProductVO(this.MOCK_DATA);

		// When
		vo.sell();
		vo.sell();
		vo.sell();
		vo.sell();
		vo.sell();
		var currentStockCount = vo.sell();

		// Then
		equal(currentStockCount, -1);
		equal(vo.getStockCount(), 0);
	});
});
