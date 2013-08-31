var app = angular.module('app',[]);

app.controller('DesktopCtrl',['$scope',function($scope) {
		$scope.views=['apps','desktop','temp','search']
		$scope.activeView=$scope.views[0]
		$scope.toggleActive = function(panel){
			if($scope.showSettings=='show'){
				$scope.toggleSettings();
			}
			if($scope.activeView==$scope.views[0]){
				$scope.activeView=$scope.views[1];
				$scope.search.name='';
			} else if($scope.activeView==$scope.views[1]) {
				$scope.activeView=$scope.views[0]
			} else if($scope.activeView!=$scope.views[1] && panel=='desktop'){
				$scope.activeView=$scope.views[1];
				$scope.search.name='';
			}
		}

		$scope.showSettings='hide';
		$scope.toggleSettings = function(){
			if($scope.showSettings=='show'){
				$scope.showSettings='hide';
			} else {
				$scope.showSettings='show';
				if($scope.search.name.length>0){
					$scope.search.name='';
				}
			}

		}
		$scope.$watch('search.name',function(){
			var search = $scope.search.name;
			if($scope.activeView==$scope.views[1] && search.length>0){
				$scope.activeView=$scope.views[2];
			
			} else if ($scope.activeView==$scope.views[0] && search.length>0){

				$scope.activeView=$scope.views[3];
			
			}
			if(search.length>0 && $scope.showSettings=='show'){
				$scope.showSettings='hide';
			}
			 if (search.length==0 && $scope.activeView==$scope.views[2]){
				$scope.activeView=$scope.views[1];
				
			} else if (search.length==0 && $scope.activeView==$scope.views[3]){
				$scope.activeView=$scope.views[0];
				
			}
		})

		$scope.setAppView=function(appDetails){
			$scope.appView=appDetails;
			 
			setTimeout(function(){
				$scope.appView.state='grow';
				$scope.appView.xpos=0;
				$scope.appView.ypos=0;}
				,600);
		}

		$scope.closeApp=function(){
			$scope.appView.state='';
		}
	}]);
app.controller('AppListCtrl',['$scope',function($scope){
		$scope.apps = [
			{"name":"explorer",
			 "width":"single"},
			{"name":"mail",
			 "width":"double",
			 "icon":"icon-envelope-alt",
			 "color":"orange"},
			{"name":"about",
			 "width":"single"},
			{"name":"twitter",
			 "width":"single",
			 "icon":"icon-twitter-sign",
			 "color":"light-blue"},
			{"name":"facebook",
			 "width":"single",
			 "icon" : "icon-facebook-sign",
			 "color":"blue"},
			{"name":"github",
			 "width":"double",
			 "icon": "icon-github-alt",
			 "color":"green"},
			 {"name":"linkedin",
			 "width":"single",
			 "icon":"icon-linkedin-sign",
			 "color":"blue"},
			{"name":"word",
			 "width":"single"},
			{"name":"excel",
			 "width":"single",
			 "color":"green"},
			{"name":"submlime txt",
			 "width":"single",
			 "color":"grey"},
			{"name":"cmd",
			 "width":"single",
			 "icon":"icon-terminal",
			 "color":"grey"},
			 {"name":"google+",
			 "width":"double",
			 "icon":"icon-google-plus",
			 "color":"red"}
		];

		$scope.animateApp=function($event,app){
			app.state='open';

			setTimeout(function(){$scope.setAppView({state: 'open',
						xpos: $event.x-$event.offsetX+10,
						ypos: $event.y-$event.offsetY+10,
						width: app.width})},300);
				
			setTimeout(function(){app.state='flip'},2000);
			return 
		}


	}]);


app.directive('search-input', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          console.log(event);
        });
    };
});


app.directive('clock', function($timeout, dateFilter){
    return function(scope, element, attrs){
       var timeoutId; 
 
      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          element.text(dateFilter(new Date(), 'HH:mm dd/MM'));
          updateLater(); // schedule another update
        }, 1000);
      }
        
      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time ofter the DOM element was removed.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); // kick off the UI update process.
    }
});