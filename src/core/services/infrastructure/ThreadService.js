(function() {
    'use-strict';
    angular.module('demo').factory('ThreadService', ['vkThread', function(vkThread) {
        var self = this;
        var thread = vkThread();

        self.getThread = function() {
            return thread;
        };
        self.makeHttpRequest = function(config) {
            return vkhttp(config);
        };
        self.sendRequest = function(_config) {
            var param = {
                fn: self.makeHttpRequest,
                args: [_config]
            };
            return thread.exec(param);
        };
        return self;
    }]);
})();