'use strict';

var picbackServices = angular.module('picbackServices', ['picbackConfig']);

picbackServices.factory('Picback', ['$http', 'pbConfig',
    function($http, pbConfig){
        return {
            getItems: function(successCallback, errorCallback) {
                return $http.get(pbConfig.backend + '/node', {headers: {'Cache-Control': 'no-cache'}}).then(successCallback, errorCallback);
            },
            getCSRFToken: function(successCallback, errorCallback) {
                return $http.get(pbConfig.backend + '/rest/session/token').then(successCallback, errorCallback);
            },
            sendItem: function(data, csrfToken, successCallback, errorCallback) {
                var request = {
                    method: 'POST',
                    url: pbConfig.backend + '/entity/node',
                    data: data,
                    headers: {
                        'X-CSRF-Token': csrfToken,
                        'Content-Type': 'application/hal+json',
                        'Accept': 'application/json'
                    }
                };
                return $http(request).then(successCallback, errorCallback);
            }
        }
    }]);

picbackServices.factory('flickrPhotos', ['$http', 'pbConfig',
    function ($http, pbConfig) {

        return {
            // It uses https://www.flickr.com/services/api/flickr.photos.search.html
            search: function (searchPhrase, successCallback, errorCallback) {
                return $http({
                    method: 'GET',
                    url: 'https://api.flickr.com/services/rest',
                    params: {
                        method: 'flickr.photos.search',
                        api_key: pbConfig.flickrAPIKey,
                        text: searchPhrase,
                        per_page: 20,
                        sort: 'interestingness-desc',
                        extras: 'url_s',
                        format: 'json',
                        nojsoncallback: 1
                    }
                }).then(successCallback, errorCallback)
            }
        }
    }]);
