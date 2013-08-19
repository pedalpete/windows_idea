describe('Windows8 App',function(){
	describe('App list view', function(){
		beforeEach(function(){
			browser().navigateTo('../index.html');
		});
		it('should filter the app list as user types in search box', function(){
			expect(repeater('.apps li').count()).toBe(10);

			input('search').enter('it');
			expect(repeater('.apps li').count()).toBe(2);

			input('search').enter('ex');
			expect(repeater('.apps li').count()).toBe(2);
		});
	});
});