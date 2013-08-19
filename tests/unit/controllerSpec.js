describe('Windows8 controllers',function(){
	
	describe('AppListCtrl', function(){

		it('should create "apps" model with 10 apps', function(){
			var scope={},
				ctrl = new AppListCtrl(scope);

			expect(scope.apps.length).toBe(10);
		});
	});
});