
function DesktopCtrl($scope) {
	$scope.views=['apps','desktop','temp']
	$scope.activeView=$scope.views[0]
	$scope.toggleActive = function(){
		if($scope.activeView==$scope.views[0]){
			$scope.activeView=$scope.views[1];
		} else {
			$scope.activeView=$scope.views[0]
		}
	}
}

function AppListCtrl($scope){
	$scope.apps = [
		{"name":"explorer"},
		{"name":"mail"},
		{"name":"about"},
		{"name":"twitter"},
		{"name":"facebook"},
		{"name":"github"},
		{"name":"word"},
		{"name":"excel"},
		{"name":"submlime txt"},
		{"name":"cmd"},
	]
}