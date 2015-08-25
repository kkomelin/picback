'use strict';

var picbackControllers = angular.module('picbackControllers', []);

picbackControllers.controller('PicbackListCtrl', ['$scope', 'Picback', function($scope, Picback) {

    Picback.getItems(function(response) {
        $scope.picbacks = response.data;
    }, function(response) {
        console.log('Error:');
        console.log(response);
    });
}]);

picbackControllers.controller('PicbackLeavePicbackCtrl', ['$scope', 'pbConfig', 'flickrPhotos', 'Picback', function($scope, pbConfig, flickrPhotos, Picback) {

    $scope.searchPhrase = pbConfig.flickrSearchPhrase;

    $scope.flickrSearch = function() {

        flickrPhotos.search($scope.searchPhrase, function(response) {
            console.log(response.data);
            $scope.results = response.data;
        }, function(response) {
            console.log(response);
        });
    };

    $scope.flickrSearch();

    $scope.savePicback = function(picture) {

        Picback.getCSRFToken(function(response) {
            var csrfToken = response.data;

            var data = {
                "_links":{
                    "type":{
                        "href": pbConfig.backend + '/rest/type/node/picback'
                    }
                },
                "title":[
                    {
                        "value": picture.url_s
                    }
                ]
            };

            Picback.sendItem(data, csrfToken, function(response) {
                console.log(response);

                picture.sent = true;
            }, function(response) {
                console.log('Error:');
                console.log(response);
            });
        }, function(response) {
            console.log('Error:');
            console.log(response);
        });
    };

    $scope.changeSearchPhrase = function(searchPhrase) {
        $scope.searchPhrase = searchPhrase;
        $scope.flickrSearch();
    };
}]);
