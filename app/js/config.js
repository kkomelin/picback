'use strict';

var picbackConfig = angular.module('picbackConfig', []);

picbackConfig.constant('pbConfig', {
        'backend': 'http://picback.promokids.co',
        'flickrFeed': 'http://api.flickr.com/services/feeds/photos_public.gne',
        "flickrSearchPhrase": 'rest',
        'flickrAPIKey': '93bfe3a374b466a96578a7cff928e87d'
    });
