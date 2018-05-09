(function() {
    'use-strict';
    angular.module('demo',['ng-vkThread'])
    .run(['SearchEventObserver',function(SearchEventObserver) {
        console.log('App started');
    }]);
})();