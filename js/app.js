'use strict';

angular.module('picbackApp', [
    'ngRoute',
    'picbackControllers',
    'picbackServices'
]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/results', {
        templateUrl: 'views/results.html',
        controller: 'PicbackListCtrl'
    });

    $routeProvider.when('/leave-picback', {
        templateUrl: 'views/leave-picback.html',
        controller: 'PicbackLeavePicbackCtrl'
    });

  $routeProvider.otherwise({redirectTo: '/leave-picback'});
}]);
