'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.Info',
    'btford.markdown',
    'angularMoment'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    
    $routeProvider
    .when('/', {
        redirectTo: '/info'
    })
    .otherwise({redirectTo: '/info'});
}])
.controller("MainCtrl", ['$window', '$scope', '$routeParams', '$location',
    
    function($window, $scope, $routeParams, $location, communityListener) {
        
        $scope.init = function(){
            //console.log("Entro a ini!");
            /*try {
                //console.log("Entro a try catch");
                $window.addEventListener('message', function(evt) {
                    //console.log("info Connections", evt.data);
                    $window.localStorage.setItem('infoComunidad', JSON.stringify(evt.data));
                });
		    } catch (e) {
                console.log(e);
            }
            
            $window.parent.postMessage("appReady", "*"); */           
        }        
    }
                         
])
.run(function($rootScope, $window, $location, amMoment){    
});
