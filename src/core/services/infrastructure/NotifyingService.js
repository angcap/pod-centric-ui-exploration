(function() {
    'use-strict';
    // Infrastrucutre service: uses the rootScope as a service bus
    angular.module('demo').factory('NotifyingService', ['$rootScope', function($rootScope) {
        return {
            SEARCH_EVENT: 'search_event',
            subscribe: function(event, callback, scope) {
                var handler = $rootScope.$on(event, callback);
                if (scope)
                    scope.$on('$destroy', handler);
            },
            notify: function(event, args) {
                $rootScope.$emit(event, args);
            }
        };
    }]);
})();