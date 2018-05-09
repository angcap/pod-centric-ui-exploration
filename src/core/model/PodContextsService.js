(function() {
    'use-strict';
    // Just an helper service in order to user typed values.
    angular.module('demo').factory('PodContextsService',[function() {
        var contexts = {
            EXA003: 'EXA003',
            EXAMCM: 'EXAMCM',
            REGISTRY: 'REGISTRY',
        }
        return {
            EXA003: contexts.EXA003,
            EXAMCM: contexts.EXAMCM,
            REGISTRY: contexts.REGISTRY,
            getAvailableContexts: function(){
                return Object.keys(contexts);
            }
        };
    }]);
})();