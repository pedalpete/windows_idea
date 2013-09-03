var app = angular.module('app',[]);

app.controller('DesktopCtrl',['$scope',function($scope) {
		$scope.views=['apps','desktop','temp','search']
		$scope.activeView=$scope.views[0]
		$scope.toggleActive = function(panel){

			if($scope.showSettings=='show'){
				$scope.toggleSettings();
			}
			if($scope.activeView==$scope.views[3] && $scope.search.name.length>0 || $scope.activeView==$scope.views[2] && $scope.search.name.length>0 ){
				$scope.search.name='';
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
			 if(appDetails.width!=undefined){
			 	var duration = 200;
			 }else {
			 	var duration=0;
			 }
			setTimeout(function(){
				$scope.appView.state='grow';
				$scope.appView.xpos=0;
				$scope.appView.ypos=0;}
				,duration);
		}

			$scope.setPageView=function(appDetails){
			$scope.pageView=appDetails;
	
			setTimeout(function(){
				$scope.pageView.state='grow';
				$scope.pageView.xpos=0;
				$scope.pageView.ypos=0;}
				,200);
		}

		$scope.closeView=function(){
			$scope.pageView.state='';
		}
		$scope.closeApp=function(){
			$scope.appView.state='';
		
		}

		
	}]);
app.controller('AppListCtrl',['$scope',function($scope){
		$scope.apps = [
			{"name":"outlook",
			 "width":"single",
			 "img":"outlook"},
			{"name":"about",
			 "width":"single",
			 "img":"profile",
			 "page":"http://pedalpete.github.io/resume"},
			{"name":"twitter",
			 "width":"single",
			 "icon":"icon-twitter-sign",
			 "color":"light-blue"},
			{"name":"facebook",
			 "width":"single",
			 "icon" : "icon-facebook-sign",
			 "color":"blue",
			 "img":""},
			{"name":"github",
			 "width":"double",
			 "icon": "icon-github-alt",
			 "color":"green",
			 "img":""},
			 {"name":"linkedin",
			 "width":"single",
			 "icon":"icon-linkedin-sign",
			 "color":"blue",
			 "img":""},
			{"name":"word",
			 "width":"single",
			 "img":"word"},
			{"name":"excel",
			 "width":"single",
			 "color":"green",
			"img":"excel"},
			{"name":"cmd",
			 "width":"single",
			 "icon":"icon-terminal",
			 "color":"grey",
			 "img":""},
			 {"name":"google+",
			 "width":"double",
			 "icon":"icon-google-plus",
			 "color":"red"},
			 {"name":"skype",
			 "width":"single",
			 "icon":"icon-skype",
			 "color":"light-blue",
			 "img":""},
			 {"name":"mail",
			 "width":"double",
			 "icon":"icon-envelope-alt",
			 "color":"orange",
			 "img":""},
			 {"name":"pinterest",
			 "width":"single",
			 "icon":"icon-pinterest",
			 "color":"red",
			 "img":""}
		];

		$scope.storeapps = [
			{"title":"Example"},
			{"title":"Sample"},
			{"title":"Popular"},
			{"title":"New"},
			{"title":"Friends"}
		]

		$scope.myfiles = [
			{"title":"Holistic Windows 8 Design Exercise"},
			{"title":"Angular.js Notes"},
			{"title":"Resume"},
			{"title":"Monthly Budget"},
			{"title":"Another local file result"},
			{"title":"more local files"}
		];
		


		$scope.animateApp=function($event,app){
				if(app.page){
					$scope.setPageView({state: 'open',
						xpos: $event.x-$event.offsetX+10,
						ypos: $event.y-$event.offsetY+10,
						width: app.width,
						page: app.page,
					    name: app.name});
				} else {
					$scope.setAppView({state: 'open',
						xpos: $event.x-$event.offsetX+10,
						ypos: $event.y-$event.offsetY+10,
						width: app.width});
				}
			app.state='open';
			setTimeout(function(){app.state=''},2000);
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