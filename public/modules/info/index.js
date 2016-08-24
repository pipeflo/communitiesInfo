(function(){
	'use strict';

	angular.module('myApp.Info', ['ngRoute', 'chart.js'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	  .when('/info', {
	    templateUrl: 'modules/info/views/index.html',
	    controller: 'InfoController'
	  })
	  ;
	}])
	.controller('InfoController', InfoController)
    .factory('InfoService', InfoService)
	;
    
    function InfoController($scope, $http, $window, InfoService){
        
        $scope.processing = true;
        
        InfoService.getCommunitiesInfo()
        .success(function(data){
            
            console.log('Comunidades: ', data);
            $scope.info = data.values;
            $scope.labels = Object.keys(data.values);
            console.log('Labels: ',$scope.labels);
            $scope.total = 0;
            var values = $scope.labels.map(function(type){
                $scope.total = $scope.total + data.values[type];
                return data.values[type];
            });
            $scope.data = values;
            console.log('Values: ',values);
            $scope.org = data.org;
            $scope.processing = false;
        }).error(function(status){
            console.log('Se presentó un error al iniciar sesión ' + status);
        });
        
        //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        //$scope.data = [300, 500, 100];
	}
    
    function InfoService($http){
        var infoService = {};

        infoService.getCommunitiesInfo = function() {
            return $http.get('/api/v1/communities', {cache: true})
            .success(function(data) {
                return data;
            }).error(function(status){
                console.log(status);
            });
        };
        
        return infoService;
    }

	InfoController['$inject'] = ['$scope', '$http', '$window', 'InfoService'];
    InfoService['$inject'] = ['$http'];

}());