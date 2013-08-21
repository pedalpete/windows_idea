var app = angular.module('app',[]);

app.controller('DesktopCtrl',['$scope',function($scope) {
		$scope.views=['apps','desktop','temp']
		$scope.activeView=$scope.views[0]
		$scope.toggleActive = function(){
			if($scope.activeView==$scope.views[0]){
				$scope.activeView=$scope.views[1];
			} else {
				$scope.activeView=$scope.views[0]
			}
		}
	}]);
app.controller('AppListCtrl',['$scope',function($scope){
		$scope.apps = [
			{"name":"explorer",
			 "width":"single"},
			{"name":"mail",
			 "width":"double"},
			{"name":"about",
			 "width":"single"},
			{"name":"twitter",
			 "width":"single"},
			{"name":"facebook",
			 "width":"single"},
			{"name":"github",
			 "width":"double"},
			{"name":"word",
			 "width":"single"},
			{"name":"excel",
			 "width":"single"},
			{"name":"submlime txt",
			 "width":"single"},
			{"name":"cmd",
			 "width":"single"},
		]


	}]);
app.filter('partition', function() {
  var part = function(arr, size) {
    if ( 0 === arr.length ) return [];
    var applist=[];
    var partlist=[];
    var blocksize=0;
    var emptyapp={"name":"","width":"single"}
    console.log(arr);
    for(var a in arr){
    	var app = arr[a];

    	if(app.width=='single'){
    		console.log(app.name);
    		partlist.push(app);
    		blocksize++;
    	}
    	if(app.width=='double' && blocksize<4){
    		partlist.push(app);
    	}
    	if(app.width=='double' && blocksize>=4){
    		applist.push(partlist);
    		partlist=[app];
    		blocksize=2;
    	}
   
    	if(blocksize==size || a==arr.length-1){
    			applist.push(partlist);
    			partlist=[];
    			blocksize=0;
    		}
    }
    console.log(applist)
   return applist;
  };
  return part;
});
